import type { Metadata } from "next";
import OnboardingHomePage from "@/features/onboarding/home/components/pages";

export const metadata: Metadata = {
  title: "Boas-vindas",
  description: "Comece a configurar o Bookora para o seu estabelecimento.",
  robots: { index: false, follow: false },
};

export default OnboardingHomePage;
