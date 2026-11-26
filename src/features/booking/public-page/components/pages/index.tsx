import { Suspense } from "react";
import EstablishmentData from "../ui/establishment-data";
import EstablishmentSkeleton from "../ui/establishment-skeleton";

const BookingPage = ({ params }: PageProps<"/[slug]">) => {
  return (
    <Suspense fallback={<EstablishmentSkeleton />}>
      <EstablishmentData params={params} />
    </Suspense>
  );
};

export default BookingPage;
