import { Skeleton } from "@/shared/components/ui/skeleton";
import ServicesTableHead, { servicesTable } from "./services-table-head";

const styles = servicesTable();

// Larguras variadas para o nome não parecer uma grade repetida
const nameWidths = ["w-3/5", "w-2/5", "w-1/2"];

const ServicesTableSkeleton = () => {
  return (
    <div className={styles.root()} aria-busy="true">
      <span className="sr-only">Carregando serviços</span>

      <table className={styles.table()}>
        <ServicesTableHead />

        <tbody>
          {nameWidths.map((width) => (
            <tr key={width} className={styles.row()}>
              <td className={styles.cell()}>
                <Skeleton className={`h-3.5 ${width}`} />
              </td>
              <td className={styles.cell()}>
                <div className="flex items-center gap-3">
                  <Skeleton className="hidden h-3 w-3.5 sm:block" />
                  <Skeleton className="h-3 w-9" />
                </div>
              </td>
              <td className={styles.cell()}>
                <Skeleton className="ml-auto h-3.5 w-16" />
              </td>
              <td className={styles.cell()} />
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.footer()}>
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
};

export default ServicesTableSkeleton;
