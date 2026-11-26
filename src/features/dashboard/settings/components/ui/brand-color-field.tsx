import { CheckIcon } from "lucide-react";
import type { BrandColor } from "@/generated/prisma/enums";
import { cn } from "@/shared/utils/cn";
import { BRAND_COLOR_OPTIONS } from "../../constants/brand-color-options";

type BrandColorFieldProps = {
  value: BrandColor;
  onValueChange: (value: BrandColor) => void;
  error?: string;
  disabled?: boolean;
};

const BrandColorField = ({
  value,
  onValueChange,
  error,
  disabled,
}: BrandColorFieldProps) => {
  const selected = BRAND_COLOR_OPTIONS.find((option) => option.value === value);

  return (
    <fieldset
      disabled={disabled}
      aria-describedby={error ? "establishment-brand-color-error" : undefined}
      className="flex flex-col gap-2"
    >
      <legend className="mb-2 text-sm font-medium text-fg">
        Cor da página
        {selected && (
          <span className="font-regular text-fg-muted">
            {" "}
            · {selected.label}
          </span>
        )}
      </legend>

      <div className="flex flex-wrap gap-2.5">
        {BRAND_COLOR_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="relative inline-flex cursor-pointer has-disabled:cursor-default"
          >
            <input
              type="radio"
              name="brandColor"
              value={option.value}
              checked={value === option.value}
              onChange={() => onValueChange(option.value)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                "block size-control-md rounded-full shadow-xs outline-2 outline-offset-2 outline-transparent transition-colors peer-checked:outline-fg peer-focus-visible:shadow-focus peer-disabled:opacity-50",
                option.swatchClassName,
              )}
            />
            <CheckIcon
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 m-auto hidden size-icon-sm text-brand-on peer-checked:block"
            />
            <span className="sr-only">{option.label}</span>
          </label>
        ))}
      </div>

      {error && (
        <p id="establishment-brand-color-error" className="text-xs text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
};

export default BrandColorField;
