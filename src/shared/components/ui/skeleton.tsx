import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

/** Bloco de carregamento; defina tamanho e forma pelo `className` */
export const Skeleton = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    data-slot="skeleton"
    aria-hidden="true"
    className={cn(
      "rounded-sm bg-skeleton motion-safe:animate-pulse",
      className,
    )}
    {...props}
  />
);
