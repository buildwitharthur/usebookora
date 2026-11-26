import { servicesList } from "./services-section";

const styles = servicesList();

const ServicesEmpty = () => {
  return (
    <div
      className={styles.root({
        class: "flex flex-col items-center gap-3 px-6 py-10 text-center",
      })}
    >
      {/* Slots vazios: eco dos blocos de duração da lista */}
      <span aria-hidden="true" className="flex gap-0.5">
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
        <span className="h-3 w-1.5 rounded-sm bg-border-strong" />
      </span>

      <div className="flex flex-col gap-1">
        <p className="font-medium">Nenhum serviço disponível</p>
        <p className="max-w-80 text-sm text-pretty text-fg-secondary">
          Este estabelecimento ainda não tem serviços para agendar online.
        </p>
      </div>
    </div>
  );
};

export default ServicesEmpty;
