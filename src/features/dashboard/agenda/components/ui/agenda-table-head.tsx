import { tv } from "tailwind-variants";

/** Estilos compartilhados pela tabela e pelo skeleton, para não haver salto ao carregar */
export const agendaTable = tv({
  slots: {
    root: "overflow-hidden rounded-lg border border-border bg-surface shadow-xs",
    table: "w-full table-fixed border-collapse text-sm",
    headCell: "h-9 px-3 text-left text-xs font-medium text-fg-muted first:pl-4",
    row: "h-10 border-t border-border",
    cell: "px-3 first:pl-4",
    footer: "border-t border-border bg-canvas px-4 py-2 text-xs text-fg-muted",
  },
});

const styles = agendaTable();

const AgendaTableHead = () => {
  return (
    <>
      <colgroup>
        <col className="w-32" />
        <col />
        {/* No celular o telefone vai para baixo do nome do cliente */}
        <col className="hidden w-40 sm:table-column" />
        <col className="w-2/5 sm:w-1/3" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col" className={styles.headCell()}>
            Horário
          </th>
          <th scope="col" className={styles.headCell()}>
            Cliente
          </th>
          <th
            scope="col"
            className={styles.headCell({ class: "hidden sm:table-cell" })}
          >
            Telefone
          </th>
          <th scope="col" className={styles.headCell()}>
            Serviço
          </th>
        </tr>
      </thead>
    </>
  );
};

export default AgendaTableHead;
