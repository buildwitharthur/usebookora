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

export type PricingCardCta = {
  label: string;
  href: string;
};

export type PricingCardProps = {
  plan: Plan;
  /** Sufixo do preço nos planos pagos (ex.: "/mês") */
  periodLabel: string;
  /** No lugar do preço quando o plano é gratuito (ex.: "Grátis") */
  freeLabel: string;
  /** Sufixo do preço quando o plano é gratuito (ex.: "sem cartão") */
  freePeriodLabel: string;
  highlightLabel: string;
  cta: PricingCardCta;
};

const PricingCard = ({
  plan,
  periodLabel,
  freeLabel,
  freePeriodLabel,
  highlightLabel,
  cta,
}: PricingCardProps) => {
  const styles = pricingCard({ highlighted: plan.highlighted });
  const isFree = plan.price === 0;

  return (
    <article className={styles.root()}>
      {plan.highlighted && (
        <Badge variant="brand" className="absolute -top-3 left-8 font-semibold">
          {highlightLabel}
        </Badge>
      )}

      <h3 className={styles.name()}>{plan.name}</h3>
      <p className="mt-1 text-sm text-fg-secondary">{plan.description}</p>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="text-4xl font-bold tracking-tight tabular">
          {isFree ? freeLabel : formatCurrency(plan.price)}
        </span>
        <span className="text-sm text-fg-muted">
          {isFree ? freePeriodLabel : periodLabel}
        </span>
      </p>

      <Button
        asChild
        variant={plan.highlighted ? "primary" : "secondary"}
        size="lg"
        className="mt-6 w-full"
      >
        <Link href={cta.href}>{cta.label}</Link>
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
