import React from "react";
import LandingFooter from "./footer";
import LandingHeader from "./header";

type LandingLayoutProps = {
  children: React.ReactNode;
};

const navLinks = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
];

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <LandingHeader
        homeLabel="Bookora, página inicial"
        navLabel="Navegação principal"
        navLinks={navLinks}
        secondaryCta={{ label: "Entrar", href: "/login" }}
        primaryCta={{ label: "Criar conta", href: "/login" }}
      />

      <main className="flex-1">{children}</main>

      <LandingFooter
        homeLabel="Bookora, página inicial"
        navLabel="Links do rodapé"
        tagline="Agendamentos simples para pequenos estabelecimentos."
        links={[...navLinks, { label: "Entrar", href: "/login" }]}
        copyright={`© ${new Date().getFullYear()} Bookora. Todos os direitos reservados.`}
      />
    </>
  );
};

export default LandingLayout;
