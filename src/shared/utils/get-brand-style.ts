import type { CSSProperties } from "react";
import type { BrandColor } from "@/generated/prisma/enums";

/**
 * Estilo do container `[data-brand]` da página pública: troca a cor da marca
 * pela do estabelecimento (ver globals.css). A cor vem do enum, então a
 * variável do preset sempre existe.
 */
export const getBrandStyle = (brandColor: BrandColor) =>
  ({ "--color-brand": `var(--color-preset-${brandColor})` }) as CSSProperties;
