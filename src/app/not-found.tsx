import type { Metadata } from "next";
import NotFoundPage from "@/features/errors/not-found/components/pages";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default NotFoundPage;
