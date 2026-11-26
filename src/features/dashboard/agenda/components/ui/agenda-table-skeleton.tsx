import { Skeleton } from "@/shared/components/ui/skeleton";
import AgendaTableHead, { agendaTable } from "./agenda-table-head";

const styles = agendaTable();

// Larguras variadas para os nomes não parecerem uma grade repetida
const clientWidths = ["w-3/5", "w-2/5", "w-1/2"];

const AgendaTableSkeleton = () => {
  return (
    <div className={styles.root()} aria-busy="true">
      <span className="sr-only">Carregando agendamentos</span>

      <table className={styles.table()}>
        <AgendaTableHead />

        <tbody>
          {clientWidths.map((width) => (
            <tr key={width} className={styles.row()}>
              <td className={styles.cell()}>
                <Skeleton className="h-3.5 w-20" />
              </td>
              <td className={styles.cell({ class: "py-1.5" })}>
                <Skeleton className={`h-3.5 ${width}`} />
                <Skeleton className="mt-1.5 h-3 w-24 sm:hidden" />
              </td>
              <td className={styles.cell({ class: "hidden sm:table-cell" })}>
                <Skeleton className="h-3.5 w-28" />
              </td>
              <td className={styles.cell()}>
                <Skeleton className="h-3.5 w-2/3" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer()}>
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
};

export default AgendaTableSkeleton;
