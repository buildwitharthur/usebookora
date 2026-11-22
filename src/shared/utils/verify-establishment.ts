import { redirect } from "next/navigation";

/** Quem já tem estabelecimento não precisa passar pelo onboarding */
export const verifyEstablishment = async () => {
  // TODO: quando o model de estabelecimento existir, pegar o usuário com
  // `const { user } = await verifyAuth()` e consultar o banco por `user.id`
  const hasEstablishment = false;

  if (hasEstablishment) {
    redirect("/dashboard");
  }
};
