import { getEstablishmentSettings } from "../../data-access/get-establishment-settings";
import EstablishmentForm from "./establishment-form";

/** Busca os dados do estabelecimento no servidor; fica dentro do Suspense da página */
const EstablishmentData = async () => {
  const establishment = await getEstablishmentSettings();

  return <EstablishmentForm establishment={establishment} />;
};

export default EstablishmentData;
