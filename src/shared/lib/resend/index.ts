import { Resend } from "resend";

import { env } from "@/shared/lib/env";

export const resend = new Resend(env.AUTH_RESEND_KEY);
