import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/shared/utils/cn";

const sectionHeading = tv({
  slots: {
    root: "flex max-w-md flex-col gap-4",
    eyebrow:
      "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand",
    marker: "size-1.5 rounded-sm bg-brand",
    title:
      "text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl",
    description: "text-lg leading-relaxed text-fg-secondary text-pretty",
  },
  variants: {
    align: {
      center: { root: "mx-auto items-center text-center" },
      left: { root: "items-start text-left" },
    },
  },
  defaultVariants: {
    align: "center",
  },
});

export type SectionHeadingProps = VariantProps<typeof sectionHeading> & {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align,
  className,
}: SectionHeadingProps) => {
  const styles = sectionHeading({ align });

  return (
    <div className={cn(styles.root(), className)}>
      <p className={styles.eyebrow()}>
        <span aria-hidden="true" className={styles.marker()} />
        {eyebrow}
      </p>
      <h2 className={styles.title()}>{title}</h2>
      {description && <p className={styles.description()}>{description}</p>}
    </div>
  );
};

export default SectionHeading;
