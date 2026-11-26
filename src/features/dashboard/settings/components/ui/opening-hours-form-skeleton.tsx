import { Skeleton } from "@/shared/components/ui/skeleton";
import { WEEKDAYS } from "../../constants/weekdays";
import { settingsSection } from "./settings-section";

const styles = settingsSection();

const OpeningHoursFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-4" aria-busy="true">
      <span className="sr-only">Carregando horário de funcionamento</span>

      <div className={styles.root()}>
        <div className={styles.header()}>
          <Skeleton className="h-4 w-44" />
          <Skeleton className="mt-1.5 h-3.5 w-3/5" />
        </div>

        <div className={styles.body()}>
          <ul className="flex flex-col divide-y divide-border">
            {WEEKDAYS.map((day) => (
              <li key={day.key} className="py-2.5 first:pt-0 last:pb-0">
                <div className="flex min-h-control-sm items-center gap-4">
                  <div className="flex w-24 items-center gap-2.5">
                    <Skeleton className="size-icon-sm" />
                    <Skeleton className="h-3.5 w-14" />
                  </div>
                  <Skeleton className="h-control-sm w-24 rounded-md" />
                  <Skeleton className="h-control-sm w-24 rounded-md" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-control-md w-32 rounded-md" />
      </div>
    </div>
  );
};

export default OpeningHoursFormSkeleton;
