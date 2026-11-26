import type { BrandColor } from "@/generated/prisma/enums";

type BrandColorOption = {
  value: BrandColor;
  label: string;
  /** Classe do swatch (token color.brandPresets) */
  swatchClassName: string;
};

/** Cores da página pública, na ordem em que aparecem em Configurações */
export const BRAND_COLOR_OPTIONS: BrandColorOption[] = [
  { value: "indigo", label: "Índigo", swatchClassName: "bg-preset-indigo" },
  { value: "blue", label: "Azul", swatchClassName: "bg-preset-blue" },
  { value: "teal", label: "Turquesa", swatchClassName: "bg-preset-teal" },
  { value: "green", label: "Verde", swatchClassName: "bg-preset-green" },
  { value: "orange", label: "Laranja", swatchClassName: "bg-preset-orange" },
  { value: "rose", label: "Rosa", swatchClassName: "bg-preset-rose" },
  { value: "purple", label: "Roxo", swatchClassName: "bg-preset-purple" },
  {
    value: "graphite",
    label: "Grafite",
    swatchClassName: "bg-preset-graphite",
  },
];
