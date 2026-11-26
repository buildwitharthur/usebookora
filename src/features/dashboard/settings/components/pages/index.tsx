import { Suspense } from "react";
import EstablishmentData from "../ui/establishment-data";
import EstablishmentFormSkeleton from "../ui/establishment-form-skeleton";
import OpeningHoursData from "../ui/opening-hours-data";
import OpeningHoursFormSkeleton from "../ui/opening-hours-form-skeleton";

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <header>
        <p className="text-pretty text-fg-secondary">
          Como o seu estabelecimento aparece para os clientes.
        </p>
      </header>

      <Suspense fallback={<EstablishmentFormSkeleton />}>
        <EstablishmentData />
      </Suspense>

      <Suspense fallback={<OpeningHoursFormSkeleton />}>
        <OpeningHoursData />
      </Suspense>
    </div>
  );
};

export default SettingsPage;
