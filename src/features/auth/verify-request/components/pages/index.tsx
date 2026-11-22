import { ArrowLeft, Clock, Inbox } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import EnvelopeIllustration from "../ui/envelope-illustration";

type HintProps = {
  icon: ReactNode;
  children: ReactNode;
};

const Hint = ({ icon, children }: HintProps) => (
  <li className="flex items-start gap-3">
    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-subtle text-fg-secondary">
      {icon}
    </span>
    <p className="pt-1.5 text-sm leading-snug text-fg-secondary text-pretty">
      {children}
    </p>
  </li>
);

const VerifyRequestPage = () => {
  return (
    <div className="flex animate-slide-up flex-col gap-6">
      <header className="flex flex-col items-center gap-4 text-center">
        <EnvelopeIllustration className="-mb-2 w-56" />

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold leading-tight tracking-tight">
            Confira seu e-mail
          </h1>
          <p className="text-sm text-fg-secondary text-pretty">
            Enviamos um link de acesso. Clique em{" "}
            <span className="font-medium text-fg">Acessar minha conta</span> no
            e-mail para entrar no Bookora.
          </p>
        </div>
      </header>

      <ul className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-3">
        <Hint icon={<Clock aria-hidden="true" className="size-icon-sm" />}>
          O link vale por 24 horas e funciona uma única vez.
        </Hint>
        <Hint icon={<Inbox aria-hidden="true" className="size-icon-sm" />}>
          Não chegou em alguns minutos? Procure nas pastas de spam e promoções.
        </Hint>
      </ul>

      <Button asChild className="w-full">
        <Link href="/login">
          <ArrowLeft aria-hidden="true" className="size-icon-sm" />
          Usar outro e-mail
        </Link>
      </Button>
    </div>
  );
};

export default VerifyRequestPage;
