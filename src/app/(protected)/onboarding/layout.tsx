import React from "react";

import OnboardingLayout from "@/shared/components/layouts/onboarding";
import { redirectIfHasEstablishment } from "@/shared/guards/establishment";

type OnboardingRouteLayoutProps = {
  children: React.ReactNode;
};

const OnboardingRouteLayout = async ({
  children,
}: OnboardingRouteLayoutProps) => {
  await redirectIfHasEstablishment();

  return <OnboardingLayout>{children}</OnboardingLayout>;
};

export default OnboardingRouteLayout;
