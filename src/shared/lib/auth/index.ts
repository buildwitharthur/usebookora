import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { env } from "@/shared/lib/env";
import { prisma } from "@/shared/lib/prisma";
import { sendMagicLinkEmail } from "@/shared/utils/send-magic-link-email";

const adapter = PrismaAdapter(prisma);

// Cria o usuário já com a assinatura Basic (gratuita) na mesma transação.
// O `id` fica de fora como no adapter original: quem gera é o `cuid()` do Prisma
adapter.createUser = ({ name, email, emailVerified, image }) =>
  prisma.user.create({
    data: {
      name,
      email,
      emailVerified,
      image,
      subscription: { create: {} },
    },
  });

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    // O Google verifica o e-mail, então é seguro vincular a uma conta criada por magic link
    Google({ allowDangerousEmailAccountLinking: true }),
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
    error: "/login/error",
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
