import { tv } from "tailwind-variants";
import { ButtonLink } from "@/shared/components/ui/button";
import { CheckIcon } from "@/shared/components/ui/icons";
import type { Plan } from "@/shared/constants/plans";
import { formatCurrency } from "@/shared/utils/format-currency";

const pricingCard = tv({
  slots: {
    root: "relative flex h-full flex-col rounded-2xl border bg-surface p-8 transition-shadow duration-(--duration-base)",
    badge:
      "absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-on shadow-sm",
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
        <span className={styles.badge()}>{highlightLabel}</span>
      )}

      <h3 className={styles.name()}>{plan.name}</h3>
      <p className="mt-1 text-sm text-fg-secondary">{plan.description}</p>

      <p className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight tabular">
          {formatCurrency(plan.price)}
        </span>
        <span className="text-sm text-fg-muted">{periodLabel}</span>
      </p>

      <ButtonLink
        href={`${ctaHref}?plan=${plan.id}`}
        variant={plan.highlighted ? "primary" : "secondary"}
        size="lg"
        className="mt-6 w-full"
      >
        {ctaLabel}
      </ButtonLink>

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
