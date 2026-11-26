import type { ComponentProps, CSSProperties } from "react";
import { tv } from "tailwind-variants";
import type { BrandColor } from "@/generated/prisma/enums";

/** Estilos compartilhados pela página e pelo skeleton, para não haver salto ao carregar */
export const establishmentShell = tv({
  slots: {
    root: "mx-auto flex w-full max-w-narrow flex-col gap-10 px-4 pt-10 pb-6",
    profile: "flex flex-col items-center gap-4 text-center",
    avatar: "size-avatar-xl shadow-md ring-4 ring-surface",
    heading: "flex flex-col items-center gap-1.5",
    name: "flex min-h-9 items-center text-2xl font-semibold tracking-tight text-balance",
  },
});

type EstablishmentShellProps = ComponentProps<"div"> & {
  /** Cor do estabelecimento. Sem ela (no skeleton), vale a cor do Bookora */
  brandColor?: BrandColor;
};

const styles = establishmentShell();

const EstablishmentShell = ({
  brandColor,
  className,
  ...props
}: EstablishmentShellProps) => {
  // A cor vem do enum, então a variável do preset sempre existe em globals.css
  const brandStyle = brandColor
    ? ({
        "--color-brand": `var(--color-preset-${brandColor})`,
      } as CSSProperties)
    : undefined;

  return (
    <div
      data-brand={brandColor}
      style={brandStyle}
      className={styles.root({ class: className })}
      {...props}
    />
  );
};

export default EstablishmentShell;
