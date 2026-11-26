import "server-only";

import { cache } from "react";

import { PLANS } from "@/shared/constants/plans";
import { type Dayjs, dayjs } from "@/shared/lib/dayjs";
import { prisma } from "@/shared/lib/prisma";
import { addDaysToDateKey } from "@/shared/utils/add-days-to-date-key";
import { getDateKey } from "@/shared/utils/get-date-key";
import { SCHEDULE_DAYS } from "../constants/schedule-days";
import { buildDaySlots } from "../utils/build-day-slots";
import { formatDateKey } from "../utils/format-date-key";
import { getPublicService } from "./get-public-service";

const getOpeningHours = (establishmentId: string) =>
  prisma.openingHours.findMany({
    where: { establishmentId },
    select: { weekday: true, opensAt: true, closesAt: true },
  });

// Só os que ainda não terminaram importam: horário que já passou fica
// indisponível de qualquer jeito. 3 dias à frente cobrem amanhã em qualquer fuso do Brasil
const getUpcomingBookings = (establishmentId: string, now: Dayjs) =>
  prisma.booking.findMany({
    where: {
      establishmentId,
      endsAt: { gt: now.toDate() },
      startsAt: { lt: now.add(3, "day").toDate() },
    },
    select: { startsAt: true, endsAt: true },
  });

/** O limite do plano é no total da conta (Basic: 100), não reinicia por mês */
const isAcceptingBookings = async (establishmentId: string, userId: string) => {
  const [{ planId }, bookingsCount] = await Promise.all([
    prisma.subscription.findUniqueOrThrow({
      where: { userId },
      select: { planId: true },
    }),
    prisma.booking.count({ where: { establishmentId } }),
  ]);

  const limit = PLANS.find((plan) => plan.id === planId)?.limits.bookings;

  return limit === null || (limit !== undefined && bookingsCount < limit);
};

/** 0 = domingo ... 6 = sábado, como o weekday do horário de funcionamento */
const getWeekday = (dateKey: string) => dayjs.utc(dateKey).day();

/**
 * Horários de hoje e de amanhã para um serviço, no fuso do estabelecimento.
 * Pública de propósito: não usa a sessão, qualquer visitante pode ler.
 * Serve à página e à action de agendar, que confere o horário de novo no servidor.
 */
export const getServiceAvailability = cache(
  async (slug: string, serviceId: string) => {
    const service = await getPublicService(slug, serviceId);

    if (!service) {
      return null;
    }

    const { establishment } = service;
    const { timeZone } = establishment;
    const now = dayjs();

    const [openingHours, bookings, acceptingBookings] = await Promise.all([
      getOpeningHours(establishment.id),
      getUpcomingBookings(establishment.id, now),
      isAcceptingBookings(establishment.id, establishment.userId),
    ]);

    const todayKey = getDateKey(now, timeZone);

    const days = SCHEDULE_DAYS.map(({ key, title, offset }) => {
      const dateKey = addDaysToDateKey(todayKey, offset);
      const hours = openingHours.find(
        (hours) => hours.weekday === getWeekday(dateKey),
      );

      return {
        key,
        title,
        dateLabel: formatDateKey(dateKey),
        // null: fechado neste dia
        slots: hours
          ? buildDaySlots({
              dateKey,
              opensAt: hours.opensAt,
              closesAt: hours.closesAt,
              durationMinutes: service.durationMinutes,
              bookings,
              now,
              timeZone,
            })
          : null,
      };
    });

    return { service, acceptingBookings, days };
  },
);

export type ScheduleDay = NonNullable<
  Awaited<ReturnType<typeof getServiceAvailability>>
>["days"][number];

export type ScheduleSlot = NonNullable<ScheduleDay["slots"]>[number];
