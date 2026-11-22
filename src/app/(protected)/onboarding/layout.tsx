import React from "react";

import OnboardingLayout from "@/shared/components/layouts/onboarding";
import { verifyEstablishment } from "@/shared/utils/verify-establishment";

type OnboardingRouteLayoutProps = {
  children: React.ReactNode;
};

const OnboardingRouteLayout = async ({
  children,
}: OnboardingRouteLayoutProps) => {
  await verifyEstablishment();

  return <OnboardingLayout>{children}</OnboardingLayout>;
};

export default OnboardingRouteLayout;
