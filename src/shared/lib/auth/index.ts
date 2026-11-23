import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { env } from "@/shared/lib/env";
import { prisma } from "@/shared/lib/prisma";
import { sendMagicLinkEmail } from "@/shared/utils/send-magic-link-email";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Resend({
      apiKey: env.AUTH_RESEND_KEY,
      from: env.EMAIL_FROM,
      sendVerificationRequest: ({ identifier, url }) =>
        sendMagicLinkEmail({ to: identifier, url }),
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/login/verify",
    newUser: "/onboarding",
  },
  callbacks: {
    // Com sessão no banco, o callback padrão não expõe o id do usuário
    session: ({ session, user }) => ({
      ...session,
      user: { ...session.user, id: user.id },
    }),
  },
});
