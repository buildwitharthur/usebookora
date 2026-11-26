import Stripe from "stripe";

import { env } from "@/shared/lib/env";

// Sem `apiVersion`: o SDK fixa a versão com que foi publicado, então os tipos batem com a API
export const stripe = new Stripe(env.STRIPE_SECRET_KEY);
