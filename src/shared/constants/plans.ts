export type PlanId = "basic" | "pro";

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  /** Preço mensal em centavos */
  price: number;
  /** `null` significa ilimitado */
  limits: {
    services: number | null;
    monthlyBookings: number | null;
  };
  features: string[];
  highlighted: boolean;
};

const commonFeatures = [
  "Página pública com sua cor e foto",
  "Cliente agenda sem criar conta",
  "Agenda de hoje e amanhã no dashboard",
];

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Para quem está começando a receber agendamentos online.",
    price: 2990,
    limits: { services: 5, monthlyBookings: 100 },
    features: [
      "Até 5 serviços",
      "Até 100 agendamentos por mês",
      ...commonFeatures,
    ],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para negócios com mais serviços e a agenda sempre cheia.",
    price: 4990,
    limits: { services: null, monthlyBookings: null },
    features: [
      "Serviços ilimitados",
      "Agendamentos ilimitados",
      ...commonFeatures,
    ],
    highlighted: true,
  },
];
