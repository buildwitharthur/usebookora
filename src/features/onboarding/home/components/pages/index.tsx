import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

const OnboardingHomePage = () => {
  return (
    <section className="flex w-full max-w-narrow flex-col items-center text-center">
      <h1 className="text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
        Boas-vindas ao Bookora
      </h1>

      <p className="mt-3 leading-relaxed text-pretty text-fg-secondary">
        Sua conta está pronta. Agora cadastre seu estabelecimento para montar a
        página onde seus clientes vão agendar.
      </p>

      <Button asChild size="lg" className="group mt-8 w-full sm:w-auto">
        <Link href="/onboarding/establishment">
          Cadastrar estabelecimento
          <ArrowRightIcon className="size-icon-sm transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Button>
    </section>
  );
};

export default OnboardingHomePage;
