import { plans } from "@/shared/constants/plans";
import Audiences from "../ui/audiences";
import BeforeAfter from "../ui/before-after";
import Faq from "../ui/faq";
import FinalCta from "../ui/final-cta";
import Hero from "../ui/hero";
import HowItWorks from "../ui/how-it-works";
import Pricing from "../ui/pricing";

const SIGNUP_HREF = "/login";

/**
 * Assinar o Pro exige login. O layout do dashboard já manda para o /login
 * quem não tem sessão, e quem está logado faz o upgrade por lá.
 * TODO: trocar pela action de checkout do Stripe quando ela existir
 */
const SUBSCRIBE_PRO_HREF = "/dashboard";

const faqItems = [
  {
    question: "Como funciona o teste grátis?",
    answer:
      "Ao criar sua conta, você entra no plano Basic, que é o teste grátis do Bookora. Não pede cartão de crédito e libera até 5 serviços e 100 agendamentos, com a página de agendamento e a agenda completas.",
  },
  {
    question: "Meu cliente precisa baixar aplicativo ou criar conta?",
    answer:
      "Não. Ele abre o seu link no celular ou no computador, escolhe o serviço e o horário e informa nome e telefone. O agendamento aparece na sua agenda na mesma hora.",
  },
  {
    question: "Como o Bookora evita dois clientes no mesmo horário?",
    answer:
      "Assim que um horário é agendado, ele sai da página para todo mundo. Serviços mais longos ocupam todos os blocos de 30 minutos de que precisam, então um corte de 90 minutos bloqueia uma hora e meia inteira.",
  },
  {
    question: "Com quanta antecedência o cliente pode agendar?",
    answer:
      "A página mostra os horários livres de hoje e de amanhã, sempre dentro do horário de funcionamento que você definiu.",
  },
  {
    question: "O que acontece quando o teste grátis acaba?",
    answer:
      "O teste termina ao chegar em 100 agendamentos, que valem para a conta toda e não se renovam. A partir daí, a página deixa de oferecer horários até você assinar o Pro, que não tem limite de serviços nem de agendamentos.",
  },
  {
    question: "Como assino o Pro?",
    answer:
      "Pelo menu da sua conta, no dashboard, a qualquer momento do teste. Você não precisa esperar chegar aos 100 agendamentos para assinar.",
  },
  {
    question: "E se eu não renovar a assinatura?",
    answer:
      "Sem a assinatura do Pro ativa, o dashboard e a sua página de agendamento ficam indisponíveis até você renovar. A conta não volta para o teste grátis.",
  },
];

/** Dados estruturados do produto e dos preços para o Google */
const softwareJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Bookora",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Sistema de agendamento online para salões, barbearias, clínicas e autônomos.",
  offers: plans.map((plan) => ({
    "@type": "Offer",
    name: `Plano ${plan.name}`,
    price: (plan.price / 100).toFixed(2),
    priceCurrency: "BRL",
  })),
}).replace(/</g, "\\u003c");

const HomePage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: softwareJsonLd }}
      />

      <Hero
        badge="Para salões, barbearias, clínicas e autônomos"
        title={{
          lead: "Agendamento",
          highlight: "online:",
          tail: "o cliente marca, você só",
          underline: "atende.",
        }}
        description="Crie a página de agendamento do seu negócio em minutos e mande o link no WhatsApp ou na bio do Instagram. O cliente escolhe o serviço e o horário livre, e o agendamento cai direto na sua agenda."
        primaryCta={{ label: "Começar meu teste grátis", href: SIGNUP_HREF }}
        secondaryCta={{ label: "Ver planos", href: "#planos" }}
        note="Teste grátis com até 100 agendamentos · Sem cartão de crédito"
        features={[
          {
            icon: "noSignup",
            title: "Cliente agenda sem cadastro",
            description: "Nome e telefone bastam. Sem app, sem senha.",
          },
          {
            icon: "noConflict",
            title: "Nenhum horário duplicado",
            description: "Horário agendado sai da página na mesma hora.",
          },
          {
            icon: "branding",
            title: "Com a cara do seu negócio",
            description: "Sua cor, sua foto e seus serviços com preço.",
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
            title: "Agendamentos do plano",
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

      <BeforeAfter
        eyebrow="Chega de marcar pelo WhatsApp"
        title="Quanto tempo você gasta combinando horário?"
        description="Cada conversa de ida e volta toma o seu tempo e, às vezes, o cliente desiste no meio. Com um link de agendamento, ele marca sozinho, a qualquer hora."
        before={{
          label: "Marcando pelo WhatsApp",
          chatLabel: "Exemplo de conversa para marcar um horário",
          messages: [
            {
              from: "client",
              text: "Oi! Tem horário amanhã à tarde?",
              time: "22:47",
            },
            { from: "owner", text: "Tenho às 15h", time: "23:12" },
            {
              from: "client",
              text: "15h não consigo. E às 16h?",
              time: "23:40",
            },
            {
              from: "owner",
              text: "Acabei de passar as 16h para outra pessoa…",
              time: "07:58",
            },
          ],
          points: [
            "Você responde mensagem fora do horário de trabalho",
            "Horário anotado de cabeça vira cliente duplicado",
            "O cliente desiste enquanto espera a resposta",
          ],
        }}
        after={{
          label: "Com o Bookora",
          agendaLabel: "Exemplo de agendamentos feitos pelos clientes",
          statusLabel: "Agendado",
          bookings: [
            {
              day: "Hoje",
              time: "16:00",
              client: "Juliana Rocha",
              service: "Escova",
            },
            {
              day: "Amanhã",
              time: "09:30",
              client: "Carla Mendes",
              service: "Corte feminino",
            },
            {
              day: "Amanhã",
              time: "15:00",
              client: "Bruno Martins",
              service: "Corte + barba",
            },
          ],
          points: [
            "O cliente vê só os horários livres e agenda sozinho",
            "Cada horário agendado sai da página para todo mundo",
            "Você abre a agenda e já sabe quem vem hoje e amanhã",
          ],
        }}
      />

      <HowItWorks
        id="como-funciona"
        eyebrow="Como funciona"
        title="Sua página de agendamento no ar em três passos"
        description="Teste grátis, sem instalar nada e sem configuração complicada."
        stepLabel="Passo"
        steps={[
          {
            icon: "services",
            title: "Cadastre seus serviços",
            description:
              "Informe nome, duração e preço de cada serviço e defina os dias e horários em que você atende.",
          },
          {
            icon: "share",
            title: "Compartilhe seu link",
            description:
              "Sua página fica em usebookora.com.br/seu-negocio. Mande no WhatsApp, fixe na bio do Instagram ou imprima no balcão.",
          },
          {
            icon: "calendar",
            title: "Receba agendamentos",
            description:
              "O cliente escolhe o serviço e o horário, e você acompanha tudo na agenda, sem horário em conflito.",
          },
        ]}
      />

      <Audiences
        id="para-quem-e"
        eyebrow="Para quem é"
        title="Agendamento online para quem atende com hora marcada"
        description="Se o seu negócio vive de horário marcado, o Bookora organiza a sua agenda."
        audiences={[
          {
            icon: "salon",
            name: "Salão de beleza",
            services: "Corte, escova, coloração e tratamentos",
          },
          {
            icon: "barbershop",
            name: "Barbearia",
            services: "Corte masculino, barba e pigmentação",
          },
          {
            icon: "nails",
            name: "Manicure e estética",
            services: "Unhas, design de sobrancelha e depilação",
          },
          {
            icon: "clinic",
            name: "Clínicas e consultórios",
            services: "Consultas, avaliações e retornos",
          },
          {
            icon: "therapy",
            name: "Terapeutas e psicólogos",
            services: "Sessões individuais e primeira consulta",
          },
          {
            icon: "fitness",
            name: "Personal trainer",
            services: "Aulas avulsas, avaliação física e treinos",
          },
        ]}
      />

      <Pricing
        id="planos"
        eyebrow="Planos"
        title="Teste grátis e assine quando a agenda encher"
        description="O teste e o Pro têm a mesma página de agendamento e a mesma agenda. No Pro, os limites acabam."
        plans={plans}
        periodLabel="/mês"
        freeLabel="Grátis"
        freePeriodLabel="para testar"
        highlightLabel="Sem limites"
        ctas={{
          basic: { label: "Começar meu teste grátis", href: SIGNUP_HREF },
          pro: { label: "Assinar o Pro", href: SUBSCRIBE_PRO_HREF },
        }}
        footnote="O teste não pede cartão de crédito. Assine o Pro quando quiser, direto pelo dashboard."
      />

      <Faq
        id="duvidas"
        eyebrow="Dúvidas"
        title="Perguntas frequentes"
        description="O que donos de salões, barbearias e clínicas perguntam antes de começar."
        items={faqItems}
      />

      <FinalCta
        title="Sua agenda online pode estar no ar ainda hoje"
        description="Cadastre seus serviços, copie o link e receba o primeiro agendamento sem trocar nenhuma mensagem."
        cta={{ label: "Começar meu teste grátis", href: SIGNUP_HREF }}
        note="Teste grátis com até 100 agendamentos · Sem cartão de crédito"
      />
    </>
  );
};

export default HomePage;
