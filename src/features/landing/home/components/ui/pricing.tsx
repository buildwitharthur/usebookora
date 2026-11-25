import type { Plan, PlanId } from "@/shared/constants/plans";
import PricingCard, { type PricingCardCta } from "./pricing-card";
import SectionHeading from "./section-heading";

export type PricingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  plans: Plan[];
  periodLabel: string;
  freeLabel: string;
  freePeriodLabel: string;
  highlightLabel: string;
  /** Botão de cada plano: o gratuito cria a conta, o pago leva à assinatura */
  ctas: Record<PlanId, PricingCardCta>;
  footnote: string;
};

const Pricing = ({
  id,
  eyebrow,
  title,
  description,
  plans,
  periodLabel,
  freeLabel,
  freePeriodLabel,
  highlightLabel,
  ctas,
  footnote,
}: PricingProps) => {
  return (
    <section id={id} className="scroll-mt-16 border-y border-border bg-subtle">
      <div className="mx-auto max-w-wide px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="w-full max-w-narrow sm:w-auto sm:flex-1 sm:basis-72"
            >
              <PricingCard
                plan={plan}
                periodLabel={periodLabel}
                freeLabel={freeLabel}
                freePeriodLabel={freePeriodLabel}
                highlightLabel={highlightLabel}
                cta={ctas[plan.id]}
              />
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-pretty text-fg-muted">
          {footnote}
        </p>
      </div>
    </section>
  );
};

export default Pricing;
