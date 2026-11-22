import type { ComponentProps } from "react";

/** Atalho para cores do design system dentro de gradientes e filtros SVG */
const stop = (color: string, opacity = 1) => ({
  stopColor: color,
  stopOpacity: opacity,
});

const shadowColor = { floodColor: "var(--color-neutral-900)" };

const brandMix = (amount: number) =>
  `color-mix(in oklab, var(--color-brand) ${amount}%, white)`;

/** Brilho de quatro pontas */
const sparkle = (x: number, y: number, size: number) =>
  `M${x} ${y - size}Q${x} ${y} ${x + size} ${y}Q${x} ${y} ${x} ${y + size}Q${x} ${y} ${x - size} ${y}Q${x} ${y} ${x} ${y - size}Z`;

/**
 * Envelope aberto com a carta saindo: dentro dela, o botão do link de acesso
 * na cor da marca. Material: plástico macio, luz vindo de cima.
 */
const EnvelopeIllustration = (props: ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="vrf-halo" cx="50%" cy="55%" r="50%">
          <stop offset="0%" style={stop("var(--color-brand-subtle)")} />
          <stop offset="65%" style={stop("var(--color-brand-subtle)", 0.7)} />
          <stop offset="100%" style={stop("var(--color-brand-subtle)", 0)} />
        </radialGradient>

        <linearGradient id="vrf-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-border)")} />
          <stop offset="100%" style={stop("var(--color-border-strong)")} />
        </linearGradient>

        {/* Interior do envelope: rebaixado, mais escuro em cima */}
        <linearGradient id="vrf-inside" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-neutral-200)")} />
          <stop offset="100%" style={stop("var(--color-neutral-100)")} />
        </linearGradient>

        <linearGradient id="vrf-flap" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" style={stop("var(--color-neutral-100)")} />
          <stop offset="100%" style={stop("var(--color-surface)")} />
        </linearGradient>

        <linearGradient id="vrf-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-surface)")} />
          <stop offset="100%" style={stop("var(--color-canvas)")} />
        </linearGradient>

        <linearGradient id="vrf-pocket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-surface)")} />
          <stop offset="55%" style={stop("var(--color-canvas)")} />
          <stop offset="100%" style={stop("var(--color-neutral-100)")} />
        </linearGradient>

        <linearGradient id="vrf-button" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop(brandMix(80))} />
          <stop offset="100%" style={stop("var(--color-brand)")} />
        </linearGradient>

        <filter id="vrf-drop" x="-20%" y="-20%" width="140%" height="160%">
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

        <filter id="vrf-lift" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dy="2"
            stdDeviation="3"
            floodOpacity="0.1"
            style={shadowColor}
          />
        </filter>
      </defs>

      <ellipse cx="120" cy="96" rx="116" ry="72" fill="url(#vrf-halo)" />

      {/* Sombra de contato no chão */}
      <ellipse
        cx="120"
        cy="156"
        rx="64"
        ry="5"
        fill="var(--color-neutral-900)"
        opacity="0.06"
      />

      <g filter="url(#vrf-drop)">
        {/* Fundo do envelope */}
        <rect
          x="48"
          y="70"
          width="144"
          height="82"
          rx="12"
          fill="url(#vrf-inside)"
          stroke="url(#vrf-edge)"
        />

        {/* Aba aberta, atrás da carta */}
        <path
          d="M52 72 L112 34 Q120 29 128 34 L188 72 Z"
          fill="url(#vrf-flap)"
          stroke="url(#vrf-edge)"
          strokeLinejoin="round"
        />

        {/* Carta saindo do envelope */}
        <g className="animate-slide-up [animation-delay:120ms]">
          <g filter="url(#vrf-lift)">
            <rect
              x="66"
              y="26"
              width="108"
              height="118"
              rx="8"
              fill="url(#vrf-paper)"
              stroke="url(#vrf-edge)"
            />
            <path
              d="M67 27.5 H173"
              stroke="var(--color-surface)"
              strokeLinecap="round"
            />
          </g>

          <rect
            x="80"
            y="40"
            width="44"
            height="5"
            rx="2.5"
            fill="var(--color-neutral-300)"
          />
          <rect
            x="80"
            y="51"
            width="80"
            height="4"
            rx="2"
            fill="var(--color-neutral-200)"
          />
          <rect
            x="80"
            y="59"
            width="64"
            height="4"
            rx="2"
            fill="var(--color-neutral-200)"
          />

          {/* Botão do link de acesso */}
          <g>
            <rect
              x="80"
              y="70"
              width="80"
              height="16"
              rx="8"
              fill="url(#vrf-button)"
            />
            <path
              d="M88 70.75 H152"
              stroke="white"
              strokeOpacity="0.35"
              strokeLinecap="round"
            />
            <rect
              x="90"
              y="76.5"
              width="38"
              height="3"
              rx="1.5"
              fill="var(--color-brand-on)"
              opacity="0.85"
            />
            <path
              d="M141 78 H149 M146 75 L149 78 L146 81"
              stroke="var(--color-brand-on)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* Bolso frontal: cobre a base da carta */}
        <path
          d="M48 92 L111 126 Q120 131 129 126 L192 92 V140 A12 12 0 0 1 180 152 H60 A12 12 0 0 1 48 140 Z"
          fill="url(#vrf-pocket)"
          stroke="url(#vrf-edge)"
          strokeLinejoin="round"
        />
        {/* Vinco iluminado da dobra */}
        <path
          d="M51 95.5 L111 128 Q120 133 129 128 L189 95.5"
          stroke="var(--color-surface)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <path d={sparkle(196, 40, 7)} fill={brandMix(55)} />
      <path d={sparkle(44, 54, 4.5)} fill={brandMix(40)} />
      <path d={sparkle(206, 64, 3.5)} fill={brandMix(35)} />
    </svg>
  );
};

export default EnvelopeIllustration;
