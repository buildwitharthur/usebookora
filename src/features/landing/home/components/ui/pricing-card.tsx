import Link from "next/link";
import { tv } from "tailwind-variants";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import type { Plan } from "@/shared/constants/plans";
import { formatCurrency } from "@/shared/utils/format-currency";

const pricingCard = tv({
  slots: {
    root: "relative flex h-full flex-col rounded-2xl border bg-surface p-8 transition-shadow duration-(--duration-base)",
    name: "text-lg font-semibold",
    check: "mt-0.5 size-icon-sm shrink-0",
  },
  variants: {
    highlighted: {
      true: {
        root: "border-brand shadow-lg ring-1 ring-brand",
        name: "text-brand",
        check: "text-brand",
      },
      false: {
        root: "border-border shadow-sm hover:shadow-md",
        check: "text-fg-muted",
      },
    },
  },
});

export type PricingCardProps = {
  plan: Plan;
  periodLabel: string;
  highlightLabel: string;
  /** Texto do botão; `{plan}` é trocado pelo nome do plano */
  ctaLabel: string;
  ctaHref: string;
};

const PricingCard = ({
  plan,
  periodLabel,
  highlightLabel,
  ctaLabel,
  ctaHref,
}: PricingCardProps) => {
  const styles = pricingCard({ highlighted: plan.highlighted });

  return (
    <article className={styles.root()}>
      {plan.highlighted && (
        <Badge variant="brand" className="absolute -top-3 left-8 font-semibold">
          {highlightLabel}
        </Badge>
      )}

      <h3 className={styles.name()}>{plan.name}</h3>
      <p className="mt-1 text-sm text-fg-secondary">{plan.description}</p>

      <p className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight tabular">
          {formatCurrency(plan.price)}
        </span>
        <span className="text-sm text-fg-muted">{periodLabel}</span>
      </p>

      <Button
        asChild
        variant={plan.highlighted ? "primary" : "secondary"}
        size="lg"
        className="mt-6 w-full"
      >
        <Link href={`${ctaHref}?plan=${plan.id}`}>
          {ctaLabel.replace("{plan}", plan.name)}
        </Link>
      </Button>

      <ul className="mt-8 space-y-3 border-t border-border pt-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm">
            <CheckIcon className={styles.check()} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PricingCard;
