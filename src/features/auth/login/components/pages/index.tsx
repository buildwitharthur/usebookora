import Image from "next/image";
import Link from "next/link";
import LoginForm from "../ui/login-form";

const linkClass =
  "underline underline-offset-2 decoration-border-strong hover:text-fg hover:decoration-fg-muted";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col items-center gap-3 text-center">
        <Link
          href="/"
          aria-label="Bookora, página inicial"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            width={36}
            height={36}
            priority
            unoptimized
          />
        </Link>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold leading-tight tracking-tight">
            Entrar no Bookora
          </h1>
          <p className="text-sm text-fg-secondary">
            Acesse sua agenda e seus agendamentos.
          </p>
        </div>
      </header>

      <LoginForm />

      <p className="text-center text-xs leading-relaxed text-fg-muted text-pretty">
        Ao continuar, você concorda com os{" "}
        <Link href="#" className={linkClass}>
          Termos de Serviço
        </Link>{" "}
        e a{" "}
        <Link href="#" className={linkClass}>
          Política de Privacidade
        </Link>
        .
      </p>
    </div>
  );
};

export default LoginPage;
