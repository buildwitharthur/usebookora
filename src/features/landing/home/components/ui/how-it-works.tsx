import { CalendarIcon, LinkIcon, ListIcon } from "lucide-react";
import SectionHeading from "./section-heading";

const stepIcons = {
  services: <ListIcon className="size-icon-lg" />,
  share: <LinkIcon className="size-icon-lg" />,
  calendar: <CalendarIcon className="size-icon-lg" />,
};

type HowItWorksStep = {
  icon: keyof typeof stepIcons;
  title: string;
  description: string;
};

export type HowItWorksProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Rótulo de cada etapa, seguido do número (ex.: "Passo" → "Passo 1") */
  stepLabel: string;
  steps: HowItWorksStep[];
};

const HowItWorks = ({
  id,
  eyebrow,
  title,
  description,
  stepLabel,
  steps,
}: HowItWorksProps) => {
  return (
    <section id={id} className="scroll-mt-16 border-y border-border bg-surface">
      <div className="mx-auto max-w-wide px-4 py-20 sm:px-6 sm:py-28">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </div>

        <ol className="mt-16 grid md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;

            return (
              <li key={step.title}>
                <div className="flex h-full gap-5 md:flex-col md:gap-6">
                  {/* Marcador da etapa e trilha até a próxima */}
                  <div className="flex flex-col items-center md:flex-row">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-brand-subtle text-brand">
                      {stepIcons[step.icon]}
                    </span>
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="mt-3 w-0 flex-1 border-l border-dashed border-border-strong md:mt-0 md:ml-4 md:-mr-8 md:h-0 md:w-auto md:border-t md:border-l-0"
                      />
                    )}
                  </div>

                  <div className={isLast ? "" : "pb-12 md:pb-0"}>
                    <p className="font-mono text-xs font-medium tracking-wide text-brand uppercase">
                      {stepLabel} {index + 1}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-fg-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
