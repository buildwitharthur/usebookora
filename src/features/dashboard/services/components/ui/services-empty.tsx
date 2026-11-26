import { servicesTable } from "./services-table-head";

const styles = servicesTable();

const ServicesEmpty = () => {
  return (
    <div
      className={styles.root({
        class: "flex flex-col items-center gap-3 px-6 py-10 text-center",
      })}
    >
      {/* Slots vazios: eco dos blocos de duração da tabela */}
      <span aria-hidden="true" className="flex gap-0.5">
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
      </span>

      <div className="flex flex-col gap-1">
        <h2 className="font-medium">Nenhum serviço cadastrado</h2>
        <p className="max-w-80 text-pretty text-fg-secondary">
          Cadastre o primeiro para começar a receber agendamentos. Cada serviço
          aparece na sua página com duração e preço.
        </p>
      </div>
    </div>
  );
};

export default ServicesEmpty;
