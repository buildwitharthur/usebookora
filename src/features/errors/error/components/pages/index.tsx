"use client";

import { ArrowLeft, RotateCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import UnloadedCalendarIllustration from "../ui/unloaded-calendar-illustration";

type ErrorPageProps = {
  /** Busca e renderiza de novo o trecho que falhou (prop do `error.tsx` do Next) */
  retry: () => void;
};

// Mensagem genérica de propósito: o motivo da falha não é exposto ao usuário
const ErrorPage = ({ retry }: ErrorPageProps) => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-4 py-12">
      <div className="flex w-full max-w-90 flex-col gap-6">
        <header className="flex flex-col items-center gap-4 text-center">
          <UnloadedCalendarIllustration className="-mb-2 w-56" />

          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold leading-tight tracking-tight">
              Algo deu errado
            </h1>
            <p className="text-sm text-fg-secondary text-pretty">
              Não foi possível carregar esta página. Tente de novo em alguns
              instantes.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-3">
          <Button type="button" className="w-full" onClick={() => retry()}>
            <RotateCw aria-hidden="true" className="size-icon-sm" />
            Tentar de novo
          </Button>
          <Button asChild variant="secondary" className="w-full">
            <Link href="/">
              <ArrowLeft aria-hidden="true" className="size-icon-sm" />
              Voltar para o início
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
