import { getOpeningHours } from "../../data-access/get-opening-hours";
import OpeningHoursForm from "./opening-hours-form";

/** Busca o horário de funcionamento no servidor; fica dentro do Suspense da página */
const OpeningHoursData = async () => {
  const openingHours = await getOpeningHours();

  return <OpeningHoursForm openingHours={openingHours} />;
};

export default OpeningHoursData;
