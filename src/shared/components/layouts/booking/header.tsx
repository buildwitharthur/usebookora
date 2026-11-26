import Image from "next/image";
import Link from "next/link";

/**
 * Barra fina com a marca do Bookora. Não é fixa: a página é do
 * estabelecimento, e a marca do Bookora não deve acompanhar a rolagem.
 */
const BookingHeader = () => {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-narrow items-center justify-center px-4">
        {/* Nova aba: o cliente não perde o agendamento que está fazendo */}
        <Link
          href="/"
          target="_blank"
          rel="noopener"
          aria-label="Bookora (abre em nova aba)"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          <Image
            src="/brand/logo.svg"
            alt=""
            width={123}
            height={24}
            priority
            unoptimized
            className="h-5 w-auto"
          />
        </Link>
      </div>
    </header>
  );
};

export default BookingHeader;
