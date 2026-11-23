import React from "react";

import { getSessionOrRedirect } from "@/shared/guards/session";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  await getSessionOrRedirect();

  return children;
};

export default ProtectedLayout;
