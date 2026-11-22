import Reveal from "@/shared/components/ui/reveal";
import type { Plan } from "@/shared/constants/plans";
import PricingCard from "./pricing-card";
import SectionHeading from "./section-heading";

export type PricingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  plans: Plan[];
  periodLabel: string;
  highlightLabel: string;
  ctaLabel: string;
  ctaHref: string;
  footnote: string;
};

const Pricing = ({
  id,
  eyebrow,
  title,
  description,
  plans,
  periodLabel,
  highlightLabel,
  ctaLabel,
  ctaHref,
  footnote,
}: PricingProps) => {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="mx-auto max-w-wide px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {plans.map((plan, index) => (
            <Reveal
              key={plan.id}
              delay={index * 120}
              className="w-full max-w-narrow sm:w-auto sm:flex-1 sm:basis-72"
            >
              <PricingCard
                plan={plan}
                periodLabel={periodLabel}
                highlightLabel={highlightLabel}
                ctaLabel={ctaLabel}
                ctaHref={ctaHref}
              />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-fg-muted">{footnote}</p>
      </div>
    </section>
  );
};

export default Pricing;
