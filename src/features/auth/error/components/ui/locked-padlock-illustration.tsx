import type { ComponentProps } from "react";

/** Atalho para cores do design system dentro de gradientes e filtros SVG */
const stop = (color: string, opacity = 1) => ({
  stopColor: color,
  stopOpacity: opacity,
});

const shadowColor = { floodColor: "var(--color-neutral-900)" };

const dangerMix = (amount: number) =>
  `color-mix(in oklab, var(--color-danger) ${amount}%, white)`;

/**
 * Cadeado que continuou fechado, com um selo de alerta. Mesmo material da
 * ilustração do envelope: plástico macio, luz vindo de cima.
 */
const LockedPadlockIllustration = (props: ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="err-halo" cx="50%" cy="55%" r="50%">
          <stop offset="0%" style={stop("var(--color-danger-bg)")} />
          <stop offset="65%" style={stop("var(--color-danger-bg)", 0.7)} />
          <stop offset="100%" style={stop("var(--color-danger-bg)", 0)} />
        </radialGradient>

        <linearGradient id="err-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-border)")} />
          <stop offset="100%" style={stop("var(--color-border-strong)")} />
        </linearGradient>

        {/* Haste: metal fosco, mais claro em cima */}
        <linearGradient id="err-shackle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-neutral-300)")} />
          <stop offset="100%" style={stop("var(--color-neutral-400)")} />
        </linearGradient>

        <linearGradient id="err-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-surface)")} />
          <stop offset="55%" style={stop("var(--color-canvas)")} />
          <stop offset="100%" style={stop("var(--color-neutral-100)")} />
        </linearGradient>

        {/* Fechadura rebaixada: mais escura em cima */}
        <linearGradient id="err-keyhole" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-neutral-400)")} />
          <stop offset="100%" style={stop("var(--color-neutral-300)")} />
        </linearGradient>

        <linearGradient id="err-badge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop(dangerMix(78))} />
          <stop offset="100%" style={stop("var(--color-danger)")} />
        </linearGradient>

        <filter id="err-drop" x="-20%" y="-20%" width="140%" height="160%">
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

        <filter id="err-lift" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dy="2"
            stdDeviation="2.5"
            floodOpacity="0.16"
            style={shadowColor}
          />
        </filter>
      </defs>

      <ellipse cx="120" cy="96" rx="116" ry="72" fill="url(#err-halo)" />

      {/* Sombra de contato no chão */}
      <ellipse
        cx="120"
        cy="156"
        rx="54"
        ry="5"
        fill="var(--color-neutral-900)"
        opacity="0.06"
      />

      {/* Marcas de tremida: alguém tentou abrir */}
      <g
        stroke="var(--color-neutral-300)"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M58 98 Q52 110 58 122" />
        <path d="M48 104 Q44 110 48 116" />
        <path d="M182 104 Q188 116 182 128" />
      </g>

      {/* Cadeado (a haste e o corpo tremem juntos) */}
      <g className="origin-[50%_0%] transform-fill motion-safe:animate-lock-shake">
        {/* Haste fechada */}
        <path
          d="M98 84 V62 A22 22 0 0 1 142 62 V84"
          stroke="url(#err-shackle)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M95.5 70 V62 A24.5 24.5 0 0 1 112 39"
          stroke="var(--color-surface)"
          strokeOpacity="0.7"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <g filter="url(#err-drop)">
          <rect
            x="70"
            y="76"
            width="100"
            height="76"
            rx="18"
            fill="url(#err-body)"
            stroke="url(#err-edge)"
          />
          {/* Borda superior iluminada */}
          <path
            d="M86 77.5 H154"
            stroke="var(--color-surface)"
            strokeLinecap="round"
          />
        </g>

        {/* Fechadura */}
        <path
          d="M120 98 a8 8 0 0 1 4.5 14.6 L127 128 a2 2 0 0 1 -2 2.3 h-10 a2 2 0 0 1 -2 -2.3 L115.5 112.6 A8 8 0 0 1 120 98 Z"
          fill="url(#err-keyhole)"
        />
        <path
          d="M114 130.5 H126"
          stroke="var(--color-surface)"
          strokeLinecap="round"
        />
      </g>

      {/* Selo de alerta */}
      <g filter="url(#err-lift)">
        <circle
          cx="166"
          cy="78"
          r="15"
          fill="url(#err-badge)"
          stroke="var(--color-surface)"
          strokeWidth="3"
        />
        <path
          d="M158 71.5 Q166 66 174 71.5"
          stroke="white"
          strokeOpacity="0.35"
          strokeLinecap="round"
        />
        <path
          d="M166 71 V80"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="166" cy="85.5" r="1.75" fill="white" />
      </g>
    </svg>
  );
};

export default LockedPadlockIllustration;
