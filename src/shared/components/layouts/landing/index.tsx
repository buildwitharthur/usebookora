import React from "react";

import { dayjs } from "@/shared/lib/dayjs";
import LandingFooter from "./footer";
import LandingHeader from "./header";

type LandingLayoutProps = {
  children: React.ReactNode;
};

const navLinks = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Para quem é", href: "#para-quem-e" },
  { label: "Planos", href: "#planos" },
  { label: "Dúvidas", href: "#duvidas" },
];

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <LandingHeader
        homeLabel="Bookora, página inicial"
        navLabel="Navegação principal"
        navLinks={navLinks}
        secondaryCta={{ label: "Entrar", href: "/login" }}
        primaryCta={{ label: "Testar grátis", href: "/login" }}
      />

      <main className="flex-1">{children}</main>

      <LandingFooter
        homeLabel="Bookora, página inicial"
        navLabel="Links do rodapé"
        tagline="Sistema de agendamento online para salões, barbearias, clínicas e autônomos."
        links={[...navLinks, { label: "Entrar", href: "/login" }]}
        copyright={`© ${dayjs().year()} Bookora. Todos os direitos reservados.`}
      />
    </>
  );
};

export default LandingLayout;
