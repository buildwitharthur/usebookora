import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicEstablishmentBySlug } from "@/features/booking/public-page/data-access/get-public-establishment-by-slug";
import BookingPage from "@/features/booking/public-page/components/pages";

export const generateMetadata = async ({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> => {
  const { slug } = await params;

  const establishment = await getPublicEstablishmentBySlug(slug);

  if (!establishment) {
    notFound();
  }

  const { name } = establishment;

  return {
    title: `Agende em ${name}`,
    description: `Escolha o serviço e o horário e agende em ${name} pelo Bookora, sem precisar criar conta.`,
    alternates: { canonical: `/${slug}` },
    openGraph: { url: `/${slug}`, title: `Agende em ${name}` },
  };
};

export default BookingPage;
