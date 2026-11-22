import { ButtonLink } from "@/shared/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "@/shared/components/ui/icons";
import type { LinkItem } from "@/shared/types";
import HeroShowcase, { type HeroShowcaseProps } from "./hero-showcase";

export type HeroProps = {
  badge: string;
  title: string;
  /** Trecho final do título, destacado com a cor da marca */
  highlight: string;
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  highlights: string[];
  showcase: HeroShowcaseProps;
};

/** Atraso escalonado para a entrada dos elementos do hero */
const enterDelay = (index: number) => ({ animationDelay: `${index * 80}ms` });

const Hero = ({
  badge,
  title,
  highlight,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  showcase,
}: HeroProps) => {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Grade de fundo que some nas bordas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_70%_55%_at_50%_0%,black_30%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[36rem] w-[64rem] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--color-brand-subtle),transparent)]"
      />

      <div className="mx-auto max-w-wide px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <p
            className="inline-flex animate-slide-up items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg-secondary shadow-xs"
            style={enterDelay(0)}
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-brand"
            />
            {badge}
          </p>

          <h1
            className="mt-6 animate-slide-up text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl"
            style={enterDelay(1)}
          >
            {title} <span className="text-brand">{highlight}</span>
          </h1>

          <p
            className="mt-5 animate-slide-up text-lg leading-relaxed text-pretty text-fg-secondary"
            style={enterDelay(2)}
          >
            {description}
          </p>

          <div
            className="mt-8 flex w-full animate-slide-up flex-col gap-3 sm:w-auto sm:flex-row"
            style={enterDelay(3)}
          >
            <ButtonLink href={primaryCta.href} size="lg" className="group">
              {primaryCta.label}
              <ArrowRightIcon className="size-icon-sm transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} size="lg" variant="secondary">
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <ul
            className="mt-6 flex animate-fade-in flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-fg-muted"
            style={enterDelay(5)}
          >
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon className="size-icon-sm text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 animate-scale-in" style={enterDelay(6)}>
          <HeroShowcase {...showcase} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
