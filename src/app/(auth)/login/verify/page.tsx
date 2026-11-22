import type { Metadata } from "next";
import VerifyRequestPage from "@/features/auth/verify-request/components/pages";

export const metadata: Metadata = {
  title: "Verifique seu e-mail",
  robots: { index: false },
};

export default VerifyRequestPage;
