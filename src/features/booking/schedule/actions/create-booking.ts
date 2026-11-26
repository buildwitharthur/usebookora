"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/shared/lib/prisma";
import type { PublicService } from "../data-access/get-public-service";
import {
  type ScheduleDay,
  type ScheduleSlot,
  getServiceAvailability,
} from "../data-access/get-service-availability";
import {
  type CreateBookingInput,
  type CreateBookingOutput,
  createBookingSchema,
} from "../schemas/create-booking-schema";
import type { BookingActionResult } from "../types/booking-form-state";

/** O horário escolhido, se ainda estiver livre nos dias que o cliente enxerga */
const findAvailableSlot = (days: ScheduleDay[], startsAt: string) => {
  for (const day of days) {
    const slot = day.slots?.find(
      (slot) => slot.value === startsAt && slot.available,
    );

    if (slot) {
      return { day, slot };
    }
  }

  return null;
};

const createBooking = (
  service: PublicService,
  slot: ScheduleSlot,
  { clientName, clientPhone, clientEmail }: CreateBookingOutput,
) => {
  const startsAt = new Date(slot.value);

  return prisma.booking.create({
    data: {
      establishmentId: service.establishment.id,
      serviceId: service.id,
      clientName,
      clientPhone,
      clientEmail,
      startsAt,
      endsAt: new Date(startsAt.getTime() + service.durationMinutes * 60_000),
    },
  });
};

/**
 * Action pública: quem agenda é o cliente final, sem conta. O estabelecimento
 * vem do slug e o horário é conferido de novo no servidor, nunca aceito do input.
 */
export const createBookingAction = async (
  input: CreateBookingInput,
): Promise<BookingActionResult> => {
  // O tipo do input não vale no servidor: qualquer cliente pode chamar a action
  const parsed = createBookingSchema.safeParse(input);

  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const { slug, serviceId, startsAt } = parsed.data;
  const availability = await getServiceAvailability(slug, serviceId);

  if (!availability) {
    return { error: "Este serviço não está mais disponível para agendamento." };
  }

  if (!availability.acceptingBookings) {
    return { error: "Não há horários disponíveis no momento." };
  }

  const chosen = findAvailableSlot(availability.days, startsAt);

  if (!chosen) {
    // A grade do cliente está desatualizada: busca de novo para ele ver o horário ocupado
    revalidatePath(`/${slug}/${serviceId}`);

    return {
      fieldErrors: {
        startsAt: ["Esse horário não está mais disponível. Escolha outro."],
      },
    };
  }

  try {
    await createBooking(availability.service, chosen.slot, parsed.data);
  } catch {
    return {
      error: "Não foi possível confirmar o agendamento. Tente novamente.",
    };
  }

  // A grade desta página e a agenda do dono mostram o horário marcado
  revalidatePath(`/${slug}/${serviceId}`);
  revalidatePath("/dashboard", "layout");

  return {
    success: true,
    summary: {
      clientName: parsed.data.clientName,
      serviceName: availability.service.name,
      dateLabel: `${chosen.day.title}, ${chosen.day.dateLabel}`,
      timeLabel: `${chosen.slot.label} – ${chosen.slot.endLabel}`,
    },
  };
};
