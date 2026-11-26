/** Limite de agendamentos do plano atingido: a página não oferece horários */
const ScheduleUnavailable = () => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface px-6 py-10 text-center shadow-xs">
      {/* Slots vazios: eco da grade de horários */}
      <span aria-hidden="true" className="flex gap-0.5">
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
      </span>

      <div className="flex flex-col gap-1">
        <h2 className="font-medium">Não há horários disponíveis</h2>
        <p className="max-w-80 text-sm text-pretty text-fg-secondary">
          Este estabelecimento não está recebendo agendamentos online no
          momento.
        </p>
      </div>
    </div>
  );
};

export default ScheduleUnavailable;
