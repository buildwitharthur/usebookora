import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export type FinalCtaProps = {
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  note: string;
};

const FinalCta = ({ title, description, cta, note }: FinalCtaProps) => {
  return (
    <section className="bg-inverse text-fg-inverse">
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-24">
        <h2 className="text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-narrow text-lg leading-relaxed text-pretty text-neutral-300">
          {description}
        </p>

        <Button asChild size="lg" className="group mt-8">
          <Link href={cta.href}>
            {cta.label}
            <ArrowRightIcon className="size-icon-sm transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>

        <p className="mt-4 text-xs text-neutral-400">{note}</p>
      </div>
    </section>
  );
};

export default FinalCta;
