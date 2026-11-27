import type { ComponentProps } from "react";

/** Atalho para cores do design system dentro de gradientes e filtros SVG */
const stop = (color: string, opacity = 1) => ({
  stopColor: color,
  stopOpacity: opacity,
});

const shadowColor = { floodColor: "var(--color-neutral-900)" };

const brandMix = (amount: number) =>
  `color-mix(in oklab, var(--color-brand) ${amount}%, white)`;

/** Dentes do picote, da esquerda para a direita, a partir do ponto atual */
const zigzag = (teeth: number, width: number, height: number) =>
  Array.from(
    { length: teeth },
    () => `l${width / 2} ${-height} l${width / 2} ${height}`,
  ).join(" ");

/**
 * Calendário de mesa sem a folha do dia: ela foi arrancada e caiu ao lado.
 * Mesmo material das outras ilustrações: plástico macio, luz vindo de cima.
 */
const TornCalendarIllustration = (props: ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="nf-halo" cx="50%" cy="55%" r="50%">
          <stop offset="0%" style={stop("var(--color-brand-subtle)")} />
          <stop offset="65%" style={stop("var(--color-brand-subtle)", 0.7)} />
          <stop offset="100%" style={stop("var(--color-brand-subtle)", 0)} />
        </radialGradient>

        <linearGradient id="nf-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-border)")} />
          <stop offset="100%" style={stop("var(--color-border-strong)")} />
        </linearGradient>

        <linearGradient id="nf-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-surface)")} />
          <stop offset="55%" style={stop("var(--color-canvas)")} />
          <stop offset="100%" style={stop("var(--color-neutral-100)")} />
        </linearGradient>

        {/* Faixa do topo: esmalte na cor da marca */}
        <linearGradient id="nf-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop(brandMix(84))} />
          <stop offset="100%" style={stop("var(--color-brand)")} />
        </linearGradient>

        {/* Argolas: metal fosco, mais claro em cima */}
        <linearGradient id="nf-ring" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-neutral-300)")} />
          <stop offset="100%" style={stop("var(--color-neutral-400)")} />
        </linearGradient>

        <filter id="nf-drop" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow
            dy="10"
            stdDeviation="9"
            floodOpacity="0.14"
            style={shadowColor}
          />
          <feDropShadow
            dy="1"
            stdDeviation="1"
            floodOpacity="0.08"
            style={shadowColor}
          />
        </filter>

        <filter id="nf-lift" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dy="4"
            stdDeviation="4"
            floodOpacity="0.12"
            style={shadowColor}
          />
        </filter>
      </defs>

      <ellipse cx="120" cy="96" rx="116" ry="72" fill="url(#nf-halo)" />

      {/* Sombras de contato no chão */}
      <ellipse
        cx="104"
        cy="155"
        rx="54"
        ry="5"
        fill="var(--color-neutral-900)"
        opacity="0.06"
      />
      <ellipse
        cx="188"
        cy="155"
        rx="20"
        ry="3"
        fill="var(--color-neutral-900)"
        opacity="0.05"
      />

      {/* Calendário */}
      <g filter="url(#nf-drop)">
        <rect
          x="52"
          y="36"
          width="104"
          height="116"
          rx="16"
          fill="url(#nf-body)"
          stroke="url(#nf-edge)"
        />
      </g>

      <path
        d="M52 52 A16 16 0 0 1 68 36 H140 A16 16 0 0 1 156 52 V70 H52 Z"
        fill="url(#nf-band)"
      />
      <path
        d="M68 37.5 H140"
        stroke="white"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />

      {/* O que sobrou da folha: o picote logo abaixo da faixa */}
      <path
        d={`M56 76 ${zigzag(12, 8, 4)}`}
        stroke="var(--color-border-strong)"
        strokeLinejoin="round"
      />

      {/* 404 rebaixado na folha de baixo */}
      <text
        x="104"
        y="129"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="36"
        fontWeight="700"
        letterSpacing="-1"
        fill="var(--color-surface)"
      >
        404
      </text>
      <text
        x="104"
        y="128"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="36"
        fontWeight="700"
        letterSpacing="-1"
        fill="var(--color-neutral-300)"
      >
        404
      </text>

      {/* Argolas, com a sombra que fazem na faixa */}
      {[76, 132].map((x) => (
        <g key={x}>
          <ellipse
            cx={x}
            cy="47"
            rx="6"
            ry="2"
            fill="var(--color-neutral-900)"
            opacity="0.18"
          />
          <rect
            x={x - 4}
            y="26"
            width="8"
            height="20"
            rx="4"
            fill="url(#nf-ring)"
          />
          <path
            d={`M${x - 1.5} 29 V38`}
            stroke="var(--color-surface)"
            strokeOpacity="0.7"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Folha arrancada, caída ao lado (a rotação fica fora da animação) */}
      <g transform="translate(188 108) rotate(12)">
        <g className="origin-center transform-fill motion-safe:animate-page-fall">
          <g filter="url(#nf-lift)">
            <path
              d={`M-26 -24 ${zigzag(8, 6.5, 6)} V24 A6 6 0 0 1 20 30 H-20 A6 6 0 0 1 -26 24 Z`}
              fill="url(#nf-body)"
              stroke="url(#nf-edge)"
              strokeLinejoin="round"
            />
          </g>
          <rect
            x="-15"
            y="-8"
            width="30"
            height="4"
            rx="2"
            fill="var(--color-border)"
          />
          <rect
            x="-15"
            y="2"
            width="20"
            height="4"
            rx="2"
            fill="var(--color-border)"
          />
          <rect
            x="-15"
            y="12"
            width="24"
            height="4"
            rx="2"
            fill="var(--color-border)"
          />
        </g>
      </g>
    </svg>
  );
};

export default TornCalendarIllustration;
