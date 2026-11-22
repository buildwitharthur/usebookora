import { plans } from "@/shared/constants/plans";
import Hero from "../ui/hero";
import HowItWorks from "../ui/how-it-works";
import Pricing from "../ui/pricing";

const HomePage = () => {
  return (
    <>
      <Hero
        badge="Para salões, barbearias, clínicas e autônomos"
        title="Sua agenda online,"
        highlight="pronta em minutos."
        description="Crie a página de agendamento do seu negócio, compartilhe o link e receba horários marcados sem troca de mensagens."
        primaryCta={{ label: "Criar minha página", href: "/login" }}
        secondaryCta={{ label: "Ver planos", href: "#planos" }}
        highlights={[
          "Cliente agenda sem criar conta",
          "Sem conflito de horários",
        ]}
        showcase={{
          business: {
            name: "Barbearia do João",
            initials: "BJ",
            address: "Rua das Palmeiras, 120 · Centro",
            url: "usebookora.com.br/barbearia-joao",
          },
          servicesTitle: "Escolha o serviço",
          services: [
            { name: "Corte masculino", duration: "30 min", price: "R$ 45" },
            { name: "Corte + barba", duration: "1h", price: "R$ 70" },
            { name: "Barba", duration: "30 min", price: "R$ 30" },
          ],
          selectedService: 1,
          slotsTitle: "Escolha o horário",
          dayLabel: "Hoje",
          slots: [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "14:00",
            "14:30",
            "15:00",
          ],
          selectedSlot: "14:00",
          confirmLabel: "Confirmar agendamento",
          confirmation: {
            title: "Agendamento confirmado!",
            description: "Te esperamos no horário marcado.",
          },
          notification: {
            title: "Novo agendamento",
            client: "Marina Costa",
          },
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
        }}
      />

      <HowItWorks
        id="como-funciona"
        eyebrow="Como funciona"
        title="Do cadastro ao primeiro agendamento em três passos"
        description="Sem instalar nada e sem configuração complicada."
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
        ctaLabel="Começar agora"
        ctaHref="/login"
        footnote="Troque de plano quando quiser, direto pelo dashboard."
      />
    </>
  );
};

export default HomePage;
