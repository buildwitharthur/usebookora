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

const AWNING_STRIPES = 6;
const AWNING_START = 64;
const AWNING_STRIPE_WIDTH = 32;

const SLOT_COLUMNS = [96, 119, 142];
const SLOT_ROWS = [140, 155, 170];

/**
 * Fachada de uma loja ainda sem nome: o letreiro está vazio, com o cursor
 * piscando à espera do nome do estabelecimento. Material: plástico macio,
 * luz vindo de cima. Acompanha a cor da marca.
 */
const StorefrontIllustration = (props: ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 320 240" fill="none" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="onb-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={stop("var(--color-brand-subtle)")} />
          <stop offset="70%" style={stop("var(--color-brand-subtle)", 0.8)} />
          <stop offset="100%" style={stop("var(--color-brand-subtle)", 0)} />
        </radialGradient>

        <linearGradient id="onb-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-surface)")} />
          <stop offset="60%" style={stop("var(--color-canvas)")} />
          <stop offset="100%" style={stop("var(--color-neutral-100)")} />
        </linearGradient>

        <linearGradient id="onb-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-border)")} />
          <stop offset="100%" style={stop("var(--color-border-strong)")} />
        </linearGradient>

        <linearGradient id="onb-board" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-surface)")} />
          <stop offset="100%" style={stop("var(--color-neutral-100)")} />
        </linearGradient>

        <linearGradient id="onb-awning-brand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop(brandMix(78))} />
          <stop offset="100%" style={stop("var(--color-brand)")} />
        </linearGradient>

        <linearGradient id="onb-awning-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-surface)")} />
          <stop offset="100%" style={stop("var(--color-brand-subtle)")} />
        </linearGradient>

        <linearGradient id="onb-awning-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-neutral-900)", 0.12)} />
          <stop offset="100%" style={stop("var(--color-neutral-900)", 0)} />
        </linearGradient>

        {/* Vidro rebaixado: mais escuro em cima, como surface-inset */}
        <linearGradient id="onb-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-neutral-200)")} />
          <stop offset="100%" style={stop("var(--color-surface)")} />
        </linearGradient>

        <linearGradient id="onb-door" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop(brandMix(18))} />
          <stop offset="100%" style={stop(brandMix(32))} />
        </linearGradient>

        <linearGradient id="onb-pot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--color-surface)")} />
          <stop offset="100%" style={stop("var(--color-neutral-300)")} />
        </linearGradient>

        <filter id="onb-raise" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2"
            floodOpacity="0.12"
            style={shadowColor}
          />
        </filter>

        <filter id="onb-float" x="-40%" y="-40%" width="180%" height="200%">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="1"
            floodOpacity="0.08"
            style={shadowColor}
          />
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="6"
            floodOpacity="0.14"
            style={shadowColor}
          />
        </filter>

        <filter id="onb-chip" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow
            dx="0"
            dy="0.75"
            stdDeviation="0.6"
            floodOpacity="0.16"
            style={shadowColor}
          />
        </filter>

        <filter id="onb-blur" x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        <clipPath id="onb-wall-clip">
          <rect x="70" y="84" width="180" height="128" rx="14" />
        </clipPath>
      </defs>

      {/* Halo e brilhos */}
      <circle cx="160" cy="126" r="112" fill="url(#onb-halo)" />
      <path d={sparkle(284, 54, 7)} className="fill-brand" fillOpacity="0.45" />
      <path d={sparkle(40, 80, 4.5)} className="fill-brand" fillOpacity="0.3" />
      <path
        d={sparkle(298, 132, 3.5)}
        className="fill-brand"
        fillOpacity="0.25"
      />

      {/* Sombra no chão */}
      <ellipse
        cx="168"
        cy="213"
        rx="122"
        ry="7"
        className="fill-neutral-900"
        fillOpacity="0.12"
        filter="url(#onb-blur)"
      />

      {/* Parede */}
      <g filter="url(#onb-raise)">
        <rect
          x="70.5"
          y="84.5"
          width="179"
          height="127"
          rx="13.5"
          fill="url(#onb-wall)"
          stroke="url(#onb-edge)"
        />
      </g>
      <g clipPath="url(#onb-wall-clip)">
        <rect
          x="70"
          y="104"
          width="180"
          height="18"
          fill="url(#onb-awning-shade)"
        />
        <rect
          x="70"
          y="203"
          width="180"
          height="9"
          className="fill-neutral-200"
          fillOpacity="0.7"
        />
      </g>

      {/* Vitrine com a grade de horários */}
      <rect
        x="88.5"
        y="128.5"
        width="79"
        height="63"
        rx="9.5"
        fill="url(#onb-window)"
        className="stroke-border-strong"
      />
      {SLOT_ROWS.map((y, row) =>
        SLOT_COLUMNS.map((x, column) => {
          const isSelected = row === 1 && column === 1;
          const isTaken = row === 0 && column === 2;

          if (isTaken) {
            return (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width="18"
                height="10"
                rx="3"
                className="fill-neutral-300"
                fillOpacity="0.6"
              />
            );
          }

          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="18"
              height="10"
              rx="3"
              fill={isSelected ? "url(#onb-awning-brand)" : undefined}
              className={isSelected ? undefined : "fill-surface"}
              filter="url(#onb-chip)"
            />
          );
        }),
      )}

      {/* Porta */}
      <path
        d="M184.5 211.5V134a9.5 9.5 0 0 1 9.5-9.5h28a9.5 9.5 0 0 1 9.5 9.5v77.5Z"
        fill="url(#onb-door)"
        style={{ stroke: brandMix(40) }}
      />
      <rect
        x="192"
        y="132"
        width="32"
        height="24"
        rx="6"
        className="fill-surface"
        fillOpacity="0.75"
      />
      <path
        d="M196 137l8 -3"
        className="stroke-surface"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="225" cy="194" r="2.5" className="fill-brand" />
      <circle cx="224.4" cy="193.3" r="0.8" className="fill-surface" />
      <rect
        x="180"
        y="210"
        width="56"
        height="4"
        rx="2"
        className="fill-neutral-300"
      />

      {/* Plaquinha "Aberto" pendurada na porta */}
      <path
        d="M196 170L208 162L220 170"
        className="stroke-neutral-400"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
      <circle cx="208" cy="162" r="1.5" className="fill-neutral-500" />
      <g transform="rotate(-4 208 162)" filter="url(#onb-chip)">
        <rect
          x="191.5"
          y="169.5"
          width="33"
          height="14"
          rx="4"
          className="fill-surface stroke-border-strong"
          strokeWidth="0.75"
        />
        <text
          x="208"
          y="178.6"
          textAnchor="middle"
          fontSize="6"
          fontWeight="700"
          letterSpacing="0.6"
          className="fill-success-fg"
        >
          ABERTO
        </text>
      </g>

      {/* Toldo listrado */}
      <rect
        x="62"
        y="81"
        width="196"
        height="6"
        rx="3"
        className="fill-brand-hover"
      />
      {Array.from({ length: AWNING_STRIPES }, (_, index) => {
        const x = AWNING_START + index * AWNING_STRIPE_WIDTH;
        const half = AWNING_STRIPE_WIDTH / 2;

        return (
          <path
            key={x}
            d={`M${x} 85h${AWNING_STRIPE_WIDTH}v17a${half} 9 0 0 1 -${AWNING_STRIPE_WIDTH} 0Z`}
            fill={
              index % 2 === 0
                ? "url(#onb-awning-brand)"
                : "url(#onb-awning-light)"
            }
          />
        );
      })}
      <path d="M64 86.5h192" className="stroke-surface" strokeOpacity="0.5" />

      {/* Letreiro em branco, à espera do nome */}
      <g filter="url(#onb-raise)">
        <rect
          x="60.5"
          y="48.5"
          width="199"
          height="33"
          rx="11.5"
          fill="url(#onb-board)"
          stroke="url(#onb-edge)"
        />
      </g>
      <path d="M72 49.5h176" className="stroke-surface" />
      <rect
        x="76.5"
        y="57.5"
        width="167"
        height="16"
        rx="8"
        className="stroke-border-strong"
        strokeDasharray="4 4"
      />
      <rect
        x="159"
        y="60"
        width="2"
        height="11"
        rx="1"
        className="fill-brand"
      />

      {/* Vaso de planta */}
      <ellipse
        cx="264"
        cy="183"
        rx="5"
        ry="12"
        transform="rotate(-28 264 183)"
        className="fill-green-500"
      />
      <ellipse
        cx="277"
        cy="181"
        rx="5"
        ry="13"
        transform="rotate(24 277 181)"
        className="fill-green-600"
      />
      <ellipse cx="270" cy="177" rx="4.5" ry="14" className="fill-green-500" />
      <path
        d="M270 166v20"
        className="stroke-green-100"
        strokeOpacity="0.6"
        strokeLinecap="round"
      />
      <g filter="url(#onb-raise)">
        <path
          d="M258.5 194.5h23l-3 17h-17Z"
          fill="url(#onb-pot)"
          stroke="url(#onb-edge)"
          strokeLinejoin="round"
        />
      </g>

      {/* Cartão flutuante: agendamento confirmado */}
      <g filter="url(#onb-float)">
        <rect
          x="26.5"
          y="118.5"
          width="57"
          height="30"
          rx="9.5"
          fill="url(#onb-board)"
          stroke="url(#onb-edge)"
        />
      </g>
      <path d="M36 119.5h38" className="stroke-surface" />
      <circle cx="41" cy="133.5" r="7" className="fill-success" />
      <path
        d="M38 133.6l2.1 2.1 4-4.2"
        className="stroke-surface"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="53"
        y="128"
        width="22"
        height="3.5"
        rx="1.75"
        className="fill-neutral-300"
      />
      <rect
        x="53"
        y="135"
        width="14"
        height="3.5"
        rx="1.75"
        className="fill-neutral-200"
      />
    </svg>
  );
};

export default StorefrontIllustration;
