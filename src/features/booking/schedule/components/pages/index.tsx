import { Suspense } from "react";
import ScheduleData from "../ui/schedule-data";
import ScheduleSkeleton from "../ui/schedule-skeleton";

const SchedulePage = ({ params }: PageProps<"/[slug]/[serviceId]">) => {
  return (
    <Suspense fallback={<ScheduleSkeleton />}>
      <ScheduleData params={params} />
    </Suspense>
  );
};

export default SchedulePage;
