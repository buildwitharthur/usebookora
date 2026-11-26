import { Skeleton } from "@/shared/components/ui/skeleton";
import { SCHEDULE_DAYS } from "../../constants/schedule-days";
import ScheduleShell, { scheduleShell } from "./schedule-shell";

const styles = scheduleShell();

const ScheduleSkeleton = () => {
  return (
    <ScheduleShell aria-busy="true">
      <span className="sr-only">Carregando horários</span>

      <div className={styles.backLink()}>
        <Skeleton className="h-3.5 w-36" />
      </div>

      <div className={styles.summary()}>
        <div className={styles.summaryInfo()}>
          <div className={styles.summaryName()}>
            <Skeleton className="h-5 w-40" />
          </div>
          <div className={styles.summaryMeta()}>
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
        <div className={styles.summaryPrice()}>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {SCHEDULE_DAYS.map((day) => (
          <div key={day.key} className={styles.day()}>
            <div className={styles.dayHeading({ class: "items-center" })}>
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-3.5 w-40" />
            </div>
            <div className={styles.slotsGrid()}>
              {Array.from({ length: 8 }, (_, index) => (
                <Skeleton
                  key={index}
                  className={styles.slot({ class: "rounded-md" })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScheduleShell>
  );
};

export default ScheduleSkeleton;
