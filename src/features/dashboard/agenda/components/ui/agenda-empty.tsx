import { agendaTable } from "./agenda-table-head";

const styles = agendaTable();

type AgendaEmptyProps = {
  title: string;
};

const AgendaEmpty = ({ title }: AgendaEmptyProps) => {
  return (
    <div
      className={styles.root({
        class: "flex flex-col items-center gap-3 px-6 py-10 text-center",
      })}
    >
      {/* Slots vazios: eco dos blocos de 30 minutos da agenda */}
      <span aria-hidden="true" className="flex gap-0.5">
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
      </span>

      <div className="flex flex-col gap-1">
        <p className="font-medium">{title}</p>
        <p className="max-w-80 text-pretty text-fg-secondary">
          Quando um cliente agendar pela sua página, o horário aparece aqui.
        </p>
      </div>
    </div>
  );
};

export default AgendaEmpty;
