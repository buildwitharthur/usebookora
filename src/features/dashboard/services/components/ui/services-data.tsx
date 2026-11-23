import { getServices } from "../../data-access/get-services";
import ServicesEmpty from "./services-empty";
import ServicesTable from "./services-table";

/** Busca os serviços no servidor; fica dentro do Suspense da página */
const ServicesData = async () => {
  const services = await getServices();

  if (services.length === 0) {
    return <ServicesEmpty />;
  }

  return <ServicesTable services={services} />;
};

export default ServicesData;
