import { notFound } from "next/navigation";
import { getPublicEstablishmentBySlug } from "../../data-access/get-public-establishment-by-slug";
import EstablishmentProfile from "./establishment-profile";
import EstablishmentShell from "./establishment-shell";
import ServicesEmpty from "./services-empty";
import ServicesList from "./services-list";
import ServicesSection from "./services-section";

type EstablishmentDataProps = {
  params: PageProps<"/[slug]">["params"];
};

/** Busca o estabelecimento no servidor; fica dentro do Suspense da página */
const EstablishmentData = async ({ params }: EstablishmentDataProps) => {
  const { slug } = await params;
  const establishment = await getPublicEstablishmentBySlug(slug);

  if (!establishment) {
    notFound();
  }

  const { services } = establishment;
  const hasServices = services.length > 0;

  return (
    <EstablishmentShell brandColor={establishment.brandColor}>
      <EstablishmentProfile establishment={establishment} />

      <ServicesSection withHint={hasServices}>
        {hasServices ? (
          <ServicesList slug={slug} services={services} />
        ) : (
          <ServicesEmpty />
        )}
      </ServicesSection>
    </EstablishmentShell>
  );
};

export default EstablishmentData;
