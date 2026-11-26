import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Selo "Agendamento online por Bookora", presente em todos os planos */
const BookingFooter = () => {
  return (
    <footer className="mx-auto flex w-full max-w-narrow justify-center px-4 pt-6 pb-10">
      {/*
       * Foco com outline: o surface-raised usa box-shadow e apagaria o anel de
       * foco global. Nova aba: o cliente não perde o agendamento.
       */}
      <Link
        href="/"
        target="_blank"
        rel="noopener"
        className="surface-raised inline-flex h-control-sm items-center gap-1.5 rounded-full px-3 text-xs text-fg-secondary transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <span>Agendamento online por</span>
        <Image
          src="/brand/logo.svg"
          alt="Bookora"
          width={123}
          height={24}
          unoptimized
          className="h-3.5 w-auto"
        />
        <ArrowUpRightIcon aria-hidden="true" className="size-icon-sm" />
        <span className="sr-only">(abre em nova aba)</span>
      </Link>
    </footer>
  );
};

export default BookingFooter;
