import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import LockedPadlockIllustration from "../ui/locked-padlock-illustration";

// Mensagem genérica de propósito: o motivo da falha não é exposto ao usuário
const AuthErrorPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col items-center gap-4 text-center">
        <LockedPadlockIllustration className="-mb-2 w-56" />

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold leading-tight tracking-tight">
            Não foi possível entrar
          </h1>
          <p className="text-sm text-fg-secondary text-pretty">
            O login não foi concluído. Volte e tente de novo, com o Google ou
            com o link de acesso por e-mail.
          </p>
        </div>
      </header>

      <Button asChild className="w-full">
        <Link href="/login">
          <ArrowLeft aria-hidden="true" className="size-icon-sm" />
          Voltar para o login
        </Link>
      </Button>
    </div>
  );
};

export default AuthErrorPage;
