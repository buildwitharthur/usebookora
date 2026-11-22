import { plans } from "@/shared/constants/plans";
import Hero from "../ui/hero";
import HowItWorks from "../ui/how-it-works";
import Pricing from "../ui/pricing";

const HomePage = () => {
  return (
    <>
      <Hero
        badge="Para salões, barbearias, clínicas e autônomos"
        title={{
          lead: "Seu cliente agenda",
          highlight: "sozinho,",
          tail: "e você só",
          underline: "atende.",
        }}
        description="Monte a página de agendamento do seu negócio em minutos e compartilhe o link. O cliente escolhe o serviço e o horário, e tudo cai direto na sua agenda."
        primaryCta={{ label: "Criar minha página", href: "/login" }}
        secondaryCta={{ label: "Ver planos", href: "#planos" }}
        note="Pronta em minutos · Sem instalar nada"
        features={[
          {
            icon: "noSignup",
            title: "Sem cadastro para o cliente",
            description: "Nome e telefone bastam para agendar.",
          },
          {
            icon: "noConflict",
            title: "Sem horário duplicado",
            description: "Cada horário marcado sai da agenda na hora.",
          },
          {
            icon: "branding",
            title: "Do jeito do seu negócio",
            description: "Sua cor, sua foto e seus serviços na página.",
          },
        ]}
        showcase={{
          agenda: {
            title: "Agenda de hoje",
            liveLabel: "Ao vivo",
            items: [
              {
                time: "09:00",
                client: "Rafael Lima",
                service: "Corte masculino",
              },
              { time: "10:30", client: "Ana Souza", service: "Barba" },
              {
                time: "15:00",
                client: "Pedro Alves",
                service: "Corte + barba",
              },
            ],
          },
          booking: {
            title: "Escolha o horário",
            dayLabel: "Hoje",
            times: ["09:00", "09:30", "10:00", "10:30", "14:00", "14:30"],
            selectedTime: "14:00",
            client: "Marina Costa",
            service: "Corte + barba",
            confirmLabel: "Confirmar",
            confirmedLabel: "Agendado!",
          },
          usage: {
            title: "Agendamentos no mês",
            planLabel: "Plano Basic",
            count: 86,
            limit: 100,
          },
          share: {
            title: "Sua página",
            url: "usebookora.com.br/barbearia-joao",
            copyLabel: "Copiar link",
          },
        }}
      />

      <HowItWorks
        id="como-funciona"
        eyebrow="Como funciona"
        title="Do cadastro ao primeiro agendamento em três passos"
        description="Sem instalar nada e sem configuração complicada."
        stepLabel="Passo"
        steps={[
          {
            icon: "services",
            title: "Cadastre seus serviços",
            description:
              "Informe nome, duração e preço de cada serviço e defina seus dias e horários de funcionamento.",
          },
          {
            icon: "share",
            title: "Compartilhe seu link",
            description:
              "Sua página fica em usebookora.com.br/seu-negocio. Mande no WhatsApp ou coloque na bio do Instagram.",
          },
          {
            icon: "calendar",
            title: "Receba agendamentos",
            description:
              "O cliente escolhe o serviço e o horário, e você acompanha tudo na agenda, sem horários em conflito.",
          },
        ]}
      />

      <Pricing
        id="planos"
        eyebrow="Planos"
        title="Um plano para cada momento do seu negócio"
        description="Todos os planos incluem a página pública e a agenda completa."
        plans={plans}
        periodLabel="/mês"
        highlightLabel="Mais popular"
        ctaLabel="Assinar o {plan}"
        ctaHref="/login"
        footnote="Troque de plano quando quiser, direto pelo dashboard."
      />
    </>
  );
};

export default HomePage;
