import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import TornCalendarIllustration from "../ui/torn-calendar-illustration";

/** 404 de todo o app: rotas que não existem e `notFound()` de qualquer página */
const NotFoundPage = () => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-4 py-12">
      <div className="flex w-full max-w-90 flex-col gap-6">
        <header className="flex flex-col items-center gap-4 text-center">
          <TornCalendarIllustration className="-mb-2 w-56" />

          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold leading-tight tracking-tight">
              Página não encontrada
            </h1>
            {/* O slug de um estabelecimento pode mudar e o link antigo deixa de funcionar (specs/overview.md) */}
            <p className="text-sm text-fg-secondary text-pretty">
              O endereço que você abriu não existe ou mudou. Se for o link de um
              estabelecimento, peça a ele o endereço atual da página.
            </p>
          </div>
        </header>

        <Button asChild className="w-full">
          <Link href="/">
            <ArrowLeft aria-hidden="true" className="size-icon-sm" />
            Voltar para o início
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
