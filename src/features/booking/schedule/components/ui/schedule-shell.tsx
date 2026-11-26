import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import type { BrandColor } from "@/generated/prisma/enums";
import { getBrandStyle } from "@/shared/utils/get-brand-style";

/** Estilos compartilhados pela página e pelo skeleton, para não haver salto ao carregar */
export const scheduleShell = tv({
  slots: {
    root: "mx-auto flex w-full max-w-narrow flex-col gap-6 px-4 pt-6 pb-6",
    backLink: "flex h-6 items-center",
    summary:
      "flex items-center gap-4 rounded-xl border border-border bg-surface px-4 py-3 shadow-xs",
    summaryInfo: "flex min-w-0 flex-1 flex-col gap-1.5",
    summaryName:
      "flex min-h-8 items-center text-xl font-semibold tracking-tight",
    summaryMeta: "flex h-5 items-center gap-2 text-sm text-fg-muted",
    summaryPrice: "flex h-6 items-center font-medium tabular",
    day: "flex flex-col gap-3",
    dayHeading: "flex h-6 items-baseline gap-2",
    slotsGrid: "grid grid-cols-4 gap-2",
    slot: "h-control-md",
  },
});

type ScheduleShellProps = ComponentProps<"div"> & {
  /** Cor do estabelecimento. Sem ela (no skeleton), vale a cor do Bookora */
  brandColor?: BrandColor;
};

const styles = scheduleShell();

const ScheduleShell = ({
  brandColor,
  className,
  ...props
}: ScheduleShellProps) => {
  return (
    <div
      data-brand={brandColor}
      style={brandColor ? getBrandStyle(brandColor) : undefined}
      className={styles.root({ class: className })}
      {...props}
    />
  );
};

export default ScheduleShell;
