import { type Dayjs, dayjs } from "@/shared/lib/dayjs";

/** Horário do instante no fuso do estabelecimento (ex.: "09:30") */
export const formatTime = (date: Date | Dayjs, timeZone: string) =>
  dayjs(date).tz(timeZone).format("HH:mm");
