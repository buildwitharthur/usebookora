/** Horário comercial, em minutos desde 00:00: das 09:00 às 18:00 */
export const BUSINESS_HOURS = { opensAt: 9 * 60, closesAt: 18 * 60 };

/**
 * Horário com que todo estabelecimento nasce: segunda a sexta (1 a 5, como
 * Date.getDay()) em horário comercial. A migration de opening_hours aplica o
 * mesmo padrão aos estabelecimentos que já existiam.
 */
export const DEFAULT_OPENING_HOURS = [1, 2, 3, 4, 5].map((weekday) => ({
  weekday,
  ...BUSINESS_HOURS,
}));
