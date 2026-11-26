import { type Dayjs, dayjs } from "@/shared/lib/dayjs";

/** Dia do instante no fuso, como "AAAA-MM-DD", para comparar dias sem depender do fuso do servidor */
export const getDateKey = (date: Date | Dayjs, timeZone: string) =>
  dayjs(date).tz(timeZone).format("YYYY-MM-DD");
