import { Skeleton } from "@/shared/components/ui/skeleton";
import { settingsSection } from "./settings-section";

const styles = settingsSection();

type FieldSkeletonProps = {
  /** Largura do rótulo, para os campos não parecerem uma grade repetida */
  labelWidth: string;
  /** Altura do campo (input ou textarea) */
  fieldHeight?: string;
};

const FieldSkeleton = ({
  labelWidth,
  fieldHeight = "h-control-md",
}: FieldSkeletonProps) => (
  <div className="flex flex-col gap-1.5">
    <Skeleton className={`h-3.5 ${labelWidth}`} />
    <Skeleton className={`${fieldHeight} w-full rounded-md`} />
  </div>
);

type SectionHeaderSkeletonProps = {
  titleWidth: string;
};

const SectionHeaderSkeleton = ({ titleWidth }: SectionHeaderSkeletonProps) => (
  <div className={styles.header()}>
    <Skeleton className={`h-4 ${titleWidth}`} />
    <Skeleton className="mt-1.5 h-3.5 w-3/5" />
  </div>
);

const EstablishmentFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-4" aria-busy="true">
      <span className="sr-only">Carregando dados do estabelecimento</span>

      <div className={styles.root()}>
        <SectionHeaderSkeleton titleWidth="w-48" />
        <div className={styles.body()}>
          <FieldSkeleton labelWidth="w-12" />
          <FieldSkeleton labelWidth="w-20" fieldHeight="h-24" />
          <FieldSkeleton labelWidth="w-16" />
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
            <FieldSkeleton labelWidth="w-16" />
            <FieldSkeleton labelWidth="w-20" />
          </div>
        </div>
      </div>

      <div className={styles.root()}>
        <SectionHeaderSkeleton titleWidth="w-32" />
        <div className={styles.body()}>
          <FieldSkeleton labelWidth="w-10" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3.5 w-24" />
            <div className="flex flex-wrap gap-2.5">
              {Array.from({ length: 8 }, (_, index) => (
                <Skeleton
                  key={index}
                  className="size-control-md rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-control-md w-36 rounded-md" />
      </div>
    </div>
  );
};

export default EstablishmentFormSkeleton;
