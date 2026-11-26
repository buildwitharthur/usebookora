import { dayjs } from "@/shared/lib/dayjs";

/** Dia por extenso (ex.: "2026-11-26" → "quinta-feira, 26 de novembro") */
export const formatDateKey = (dateKey: string) =>
  // A chave já é o dia no fuso do estabelecimento: ler em UTC não muda o dia
  dayjs.utc(dateKey).format("dddd, D [de] MMMM");
