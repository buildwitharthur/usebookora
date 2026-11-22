import type { Metadata } from "next";
import BookingPage from "@/features/booking/public-page/components/pages";

export const generateMetadata = async ({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> => {
  const { slug } = await params;

  // TODO: quando o model de estabelecimento existir, buscar nome, descrição
  // e imagem de perfil pelo slug (e usar `notFound()` se não existir)
  const name = slug;

  return {
    title: `Agende em ${name}`,
    description: `Escolha o serviço e o horário e agende em ${name} pelo Bookora, sem precisar criar conta.`,
    alternates: { canonical: `/${slug}` },
    openGraph: { url: `/${slug}`, title: `Agende em ${name}` },
  };
};

export default BookingPage;
