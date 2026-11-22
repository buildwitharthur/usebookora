import Reveal from "@/shared/components/ui/reveal";
import { CalendarIcon, LinkIcon, ListIcon } from "@/shared/components/ui/icons";
import SectionHeading from "./section-heading";

const stepIcons = {
  services: <ListIcon className="size-icon-lg" />,
  share: <LinkIcon className="size-icon-lg" />,
  calendar: <CalendarIcon className="size-icon-lg" />,
};

export type HowItWorksStep = {
  icon: keyof typeof stepIcons;
  title: string;
  description: string;
};

export type HowItWorksProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  steps: HowItWorksStep[];
};

const HowItWorks = ({
  id,
  eyebrow,
  title,
  description,
  steps,
}: HowItWorksProps) => {
  return (
    <section id={id} className="scroll-mt-16 border-y border-border bg-surface">
      <div className="mx-auto max-w-wide px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 120} className="h-full">
                <article className="h-full rounded-2xl border border-border bg-canvas p-6 transition-[translate,box-shadow] duration-(--duration-base) hover:-translate-y-1 hover:shadow-md sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                      {stepIcons[step.icon]}
                    </span>
                    <span className="font-mono text-sm text-fg-disabled tabular">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-fg-secondary">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
