import "server-only";

import { cache } from "react";

import { getCurrentEstablishmentOrThrow } from "@/shared/data-access/establishment/get-current-establishment-or-throw";
import { prisma } from "@/shared/lib/prisma";
import { addDaysToDateKey } from "@/shared/utils/add-days-to-date-key";
import { getDateKey } from "@/shared/utils/get-date-key";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Agendamentos de hoje e de amanhã do estabelecimento do usuário logado,
 * com os dias contados no fuso dele e ordenados pelo horário.
 */
export const getAgenda = cache(async () => {
  const establishment = await getCurrentEstablishmentOrThrow();
  const { timeZone } = establishment;
  const now = new Date();

  // Janela de 24h para trás e 48h para frente: cobre hoje e amanhã em qualquer
  // fuso do Brasil (sem horário de verão). O recorte exato é pelo dia no fuso, abaixo
  const bookings = await prisma.booking.findMany({
    where: {
      establishmentId: establishment.id,
      startsAt: {
        gte: new Date(now.getTime() - DAY_MS),
        lt: new Date(now.getTime() + 2 * DAY_MS),
      },
    },
    select: {
      id: true,
      clientName: true,
      clientPhone: true,
      startsAt: true,
      endsAt: true,
      service: { select: { name: true } },
    },
    orderBy: { startsAt: "asc" },
  });

  const todayKey = getDateKey(now, timeZone);
  const tomorrowKey = addDaysToDateKey(todayKey, 1);

  const withStatus = bookings.map((booking) => ({
    ...booking,
    hasEnded: booking.endsAt <= now,
  }));

  const onDay = (dateKey: string) =>
    withStatus.filter(
      (booking) => getDateKey(booking.startsAt, timeZone) === dateKey,
    );

  return {
    timeZone,
    today: onDay(todayKey),
    tomorrow: onDay(tomorrowKey),
  };
});

export type AgendaBooking = Awaited<
  ReturnType<typeof getAgenda>
>["today"][number];
