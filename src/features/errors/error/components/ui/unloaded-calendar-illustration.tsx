import type { ComponentProps } from "react";

/** Atalho para cores do design system dentro de gradientes e filtros SVG */
const stop = (color: string, opacity = 1) => ({
  stopColor: color,
  stopOpacity: opacity,
});

const shadowColor = { floodColor: "var(--color-neutral-900)" };

const brandMix = (amount: number) =>
  `color-mix(in oklab, var(--color-brand) ${amount}%, white)`;

const dangerMix = (amount: number) =>
  `color-mix(in oklab, var(--color-danger) ${amount}%, white)`;

/** Linhas e colunas dos horários que não chegaram a carregar */
const SLOT_ROWS = [86, 104, 122];
const SLOT_COLUMNS = [81, 109, 137];

/**
 * Calendário de mesa com os horários vazios, que não carregaram, e um selo de
 * alerta. Mesmo material das outras ilustrações: plástico macio, luz de cima.
 */
const UnloadedCalendarIllustration = (props: ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="er-halo" cx="50%" cy="55%" r="50%">
          <stop offset="0%" style={stop("var(--color-danger-bg)")} />
          <stop offset="65%" style={stop("var(--color-danger-bg)", 0.7)} />
          <stop offset="100%" style={stop("var(--color-danger-bg)", 0)} />
        </radialGradient>

        <linearGradient id="er-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-border)")} />
          <stop offset="100%" style={stop("var(--color-border-strong)")} />
        </linearGradient>

        <linearGradient id="er-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-surface)")} />
          <stop offset="55%" style={stop("var(--color-canvas)")} />
          <stop offset="100%" style={stop("var(--color-neutral-100)")} />
        </linearGradient>

        {/* Faixa do topo: esmalte na cor da marca */}
        <linearGradient id="er-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop(brandMix(84))} />
          <stop offset="100%" style={stop("var(--color-brand)")} />
        </linearGradient>

        {/* Argolas: metal fosco, mais claro em cima */}
        <linearGradient id="er-ring" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-neutral-300)")} />
          <stop offset="100%" style={stop("var(--color-neutral-400)")} />
        </linearGradient>

        {/* Horário vazio: rebaixado, mais escuro em cima */}
        <linearGradient id="er-slot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-neutral-200)")} />
          <stop offset="100%" style={stop("var(--color-slot-unavailable)")} />
        </linearGradient>

        <linearGradient id="er-badge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop(dangerMix(78))} />
          <stop offset="100%" style={stop("var(--color-danger)")} />
        </linearGradient>

        <filter id="er-drop" x="-20%" y="-20%" width="140%" height="160%">
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

        <filter id="er-lift" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dy="2"
            stdDeviation="2.5"
            floodOpacity="0.16"
            style={shadowColor}
          />
        </filter>
      </defs>

      <ellipse cx="120" cy="96" rx="116" ry="72" fill="url(#er-halo)" />

      {/* Sombra de contato no chão */}
      <ellipse
        cx="120"
        cy="155"
        rx="54"
        ry="5"
        fill="var(--color-neutral-900)"
        opacity="0.06"
      />

      {/* Calendário */}
      <g filter="url(#er-drop)">
        <rect
          x="68"
          y="36"
          width="104"
          height="116"
          rx="16"
          fill="url(#er-body)"
          stroke="url(#er-edge)"
        />
      </g>

      <path
        d="M68 52 A16 16 0 0 1 84 36 H156 A16 16 0 0 1 172 52 V70 H68 Z"
        fill="url(#er-band)"
      />
      <path
        d="M84 37.5 H156"
        stroke="white"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />

      {/* Horários que não carregaram */}
      {SLOT_ROWS.map((y) =>
        SLOT_COLUMNS.map((x) => (
          <g key={`${x}-${y}`}>
            <rect
              x={x}
              y={y}
              width="22"
              height="11"
              rx="4"
              fill="url(#er-slot)"
            />
            <path
              d={`M${x + 3} ${y + 11.5} H${x + 19}`}
              stroke="var(--color-surface)"
              strokeLinecap="round"
            />
          </g>
        )),
      )}

      {/* Argolas, com a sombra que fazem na faixa */}
      {[92, 148].map((x) => (
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
            fill="url(#er-ring)"
          />
          <path
            d={`M${x - 1.5} 29 V38`}
            stroke="var(--color-surface)"
            strokeOpacity="0.7"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Selo de alerta */}
      <g filter="url(#er-lift)">
        <circle
          cx="172"
          cy="70"
          r="15"
          fill="url(#er-badge)"
          stroke="var(--color-surface)"
          strokeWidth="3"
        />
        <path
          d="M164 63.5 Q172 58 180 63.5"
          stroke="white"
          strokeOpacity="0.35"
          strokeLinecap="round"
        />
        <path
          d="M172 63 V72"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="172" cy="77.5" r="1.75" fill="white" />
      </g>
    </svg>
  );
};

export default UnloadedCalendarIllustration;
