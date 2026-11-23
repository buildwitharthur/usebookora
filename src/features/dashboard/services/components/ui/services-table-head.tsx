import { tv } from "tailwind-variants";

/** Estilos compartilhados pela tabela e pelo skeleton, para não haver salto ao carregar */
export const servicesTable = tv({
  slots: {
    root: "overflow-hidden rounded-lg border border-border bg-surface shadow-xs",
    table: "w-full table-fixed border-collapse text-sm",
    headCell: "h-9 px-3 text-left text-xs font-medium text-fg-muted first:pl-4",
    row: "h-10 border-t border-border",
    cell: "px-3 first:pl-4",
    footer: "border-t border-border bg-canvas px-4 py-2 text-xs text-fg-muted",
  },
});

const styles = servicesTable();

const ServicesTableHead = () => {
  return (
    <>
      <colgroup>
        <col />
        <col className="w-24 sm:w-48" />
        <col className="w-24" />
        <col className="w-12" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col" className={styles.headCell()}>
            Serviço
          </th>
          <th scope="col" className={styles.headCell()}>
            Duração
          </th>
          <th scope="col" className={styles.headCell({ class: "text-right" })}>
            Preço
          </th>
          <th scope="col" className={styles.headCell()}>
            <span className="sr-only">Ações</span>
          </th>
        </tr>
      </thead>
    </>
  );
};

export default ServicesTableHead;
