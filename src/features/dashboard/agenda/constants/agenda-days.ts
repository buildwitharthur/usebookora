/** Dias da agenda, na ordem da página: o dono vê os mesmos dias que o cliente */
export const AGENDA_DAYS = [
  { key: "today", title: "Hoje", emptyTitle: "Nenhum agendamento para hoje" },
  {
    key: "tomorrow",
    title: "Amanhã",
    emptyTitle: "Nenhum agendamento para amanhã",
  },
] as const;

export type AgendaDay = (typeof AGENDA_DAYS)[number];
