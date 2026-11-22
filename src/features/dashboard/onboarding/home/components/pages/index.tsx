import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

/** Atraso escalonado para a entrada dos elementos */
const enterDelay = (index: number) => ({ animationDelay: `${index * 80}ms` });

const OnboardingPage = () => {
  return (
    <section className="flex w-full max-w-narrow flex-col items-center text-center">
      <h1
        className="animate-slide-up text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl"
        style={enterDelay(1)}
      >
        Boas-vindas ao Bookora
      </h1>

      <p
        className="mt-3 animate-slide-up leading-relaxed text-pretty text-fg-secondary"
        style={enterDelay(2)}
      >
        Sua conta está pronta. Agora cadastre seu estabelecimento para montar a
        página onde seus clientes vão agendar.
      </p>

      <Button
        asChild
        size="lg"
        className="group mt-8 w-full animate-slide-up sm:w-auto"
        style={enterDelay(3)}
      >
        <Link href="/onboarding/establishment">
          Cadastrar estabelecimento
          <ArrowRightIcon className="size-icon-sm transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Button>
    </section>
  );
};

export default OnboardingPage;
