export type PlanId = "basic" | "pro";

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  /** Preço mensal em centavos; `0` é o teste grátis (Basic) */
  price: number;
  /** `null` significa ilimitado. `bookings` é o total da conta, não reinicia por mês */
  limits: {
    services: number | null;
    bookings: number | null;
  };
  features: string[];
  highlighted: boolean;
};

const commonFeatures = [
  "Página pública com sua cor e foto",
  "Cliente agenda sem criar conta",
  "Agenda de hoje e amanhã no dashboard",
];

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description:
      "Teste grátis para receber seus primeiros agendamentos online.",
    price: 0,
    limits: { services: 5, bookings: 100 },
    features: [
      "Até 5 serviços",
      "Até 100 agendamentos no total",
      ...commonFeatures,
    ],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para negócios com mais serviços e a agenda sempre cheia.",
    price: 4990,
    limits: { services: null, bookings: null },
    features: [
      "Serviços ilimitados",
      "Agendamentos ilimitados",
      ...commonFeatures,
    ],
    highlighted: true,
  },
];
