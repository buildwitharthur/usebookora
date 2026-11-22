import {
  ArrowRightIcon,
  CalendarCheckIcon,
  PaletteIcon,
  UserRoundCheckIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import HeroShowcase, { type HeroShowcaseProps } from "./hero-showcase";

const featureIcons = {
  noSignup: <UserRoundCheckIcon className="size-icon-md" />,
  noConflict: <CalendarCheckIcon className="size-icon-md" />,
  branding: <PaletteIcon className="size-icon-md" />,
};

type HeroCta = {
  label: string;
  href: string;
};

type HeroFeature = {
  icon: keyof typeof featureIcons;
  title: string;
  description: string;
};

export type HeroProps = {
  badge: string;
  /**
   * Título em duas linhas:
   * `lead` + `highlight` (em caixa) / `tail` + `underline` (sublinhado à mão)
   */
  title: {
    lead: string;
    highlight: string;
    tail: string;
    underline: string;
  };
  description: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  note: string;
  features: HeroFeature[];
  showcase: HeroShowcaseProps;
};

/** Atraso escalonado para a entrada dos elementos do hero */
const enterDelay = (index: number) => ({ animationDelay: `${index * 80}ms` });

const Hero = ({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  note,
  features,
  showcase,
}: HeroProps) => {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Fundo: gradiente suave na cor da marca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--color-brand-subtle),transparent_70%),linear-gradient(to_bottom,var(--color-canvas),color-mix(in_oklab,var(--color-brand-subtle)_50%,var(--color-canvas)))]"
      />

      <div className="relative mx-auto max-w-352">
        <HeroShowcase {...showcase} />

        <div className="mx-auto flex max-w-md flex-col items-center px-4 pt-20 pb-24 text-center sm:px-6 sm:pt-28 sm:pb-32">
          <Badge className="animate-slide-up" style={enterDelay(0)}>
            <span
              aria-hidden="true"
              className="size-1.5 animate-pulse rounded-full bg-success"
            />
            {badge}
          </Badge>

          <h1
            className="mt-6 animate-slide-up text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl sm:leading-snug"
            style={enterDelay(1)}
          >
            {title.lead}{" "}
            <span className="rounded-xl bg-brand-subtle px-3 text-brand box-decoration-clone">
              {title.highlight}
            </span>
            <br className="hidden sm:block" /> {title.tail}{" "}
            <span className="relative inline-block whitespace-nowrap">
              {title.underline}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-3 w-full animate-fade-in text-brand"
                style={enterDelay(6)}
              >
                <path
                  d="M2 9C40 3 92 2 132 5S186 10 198 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h1>

          <p
            className="mt-6 max-w-narrow animate-slide-up text-lg leading-relaxed text-pretty text-fg-secondary"
            style={enterDelay(2)}
          >
            {description}
          </p>

          <div
            className="mt-8 grid w-full animate-slide-up gap-3 sm:w-auto sm:grid-cols-2"
            style={enterDelay(3)}
          >
            <Button asChild size="lg" className="group">
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRightIcon className="size-icon-sm transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>

          <p
            className="mt-4 animate-fade-in text-xs text-fg-muted"
            style={enterDelay(5)}
          >
            {note}
          </p>
        </div>
      </div>

      {/* Faixa de diferenciais */}
      <div className="border-t border-border bg-surface">
        <ul className="mx-auto grid max-w-wide gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title} className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-canvas text-brand">
                {featureIcons[feature.icon]}
              </span>
              <div>
                <p className="font-semibold">{feature.title}</p>
                <p className="mt-0.5 text-sm text-fg-secondary">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;
