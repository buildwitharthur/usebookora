import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicService } from "@/features/booking/schedule/data-access/get-public-service";
import SchedulePage from "@/features/booking/schedule/components/pages";

export const generateMetadata = async ({
  params,
}: PageProps<"/[slug]/[serviceId]">): Promise<Metadata> => {
  const { slug, serviceId } = await params;

  const service = await getPublicService(slug, serviceId);

  if (!service) {
    notFound();
  }

  const { name } = service;
  const establishmentName = service.establishment.name;

  return {
    title: `${name} em ${establishmentName}`,
    description: `Escolha um horário de hoje ou amanhã para ${name} em ${establishmentName}.`,
    alternates: { canonical: `/${slug}/${serviceId}` },
  };
};

export default SchedulePage;
