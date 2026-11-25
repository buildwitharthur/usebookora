import {
  DumbbellIcon,
  HandIcon,
  ScissorsIcon,
  SparklesIcon,
  StethoscopeIcon,
  BrainIcon,
} from "lucide-react";
import SectionHeading from "./section-heading";

const audienceIcons = {
  salon: <SparklesIcon className="size-icon-md" />,
  barbershop: <ScissorsIcon className="size-icon-md" />,
  nails: <HandIcon className="size-icon-md" />,
  clinic: <StethoscopeIcon className="size-icon-md" />,
  therapy: <BrainIcon className="size-icon-md" />,
  fitness: <DumbbellIcon className="size-icon-md" />,
};

type Audience = {
  icon: keyof typeof audienceIcons;
  name: string;
  /** Exemplos de serviços que esse negócio cadastra */
  services: string;
};

export type AudiencesProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  audiences: Audience[];
};

const Audiences = ({
  id,
  eyebrow,
  title,
  description,
  audiences,
}: AudiencesProps) => {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="mx-auto max-w-wide px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <li
              key={audience.name}
              className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 shadow-xs"
            >
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand"
              >
                {audienceIcons[audience.icon]}
              </span>
              <div>
                <h3 className="font-semibold">{audience.name}</h3>
                <p className="mt-0.5 text-sm text-fg-secondary">
                  {audience.services}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Audiences;
