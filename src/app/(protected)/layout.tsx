import React from "react";

import { verifyAuth } from "@/shared/utils/verify-auth";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  await verifyAuth();
  
  return children;
};

export default ProtectedLayout;
