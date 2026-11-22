import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/shared/components/ui/button";
import type { LinkItem } from "@/shared/types";

export type LandingHeaderProps = {
  homeLabel: string;
  navLabel: string;
  navLinks: LinkItem[];
  secondaryCta: LinkItem;
  primaryCta: LinkItem;
};

const LandingHeader = ({
  homeLabel,
  navLabel,
  navLinks,
  secondaryCta,
  primaryCta,
}: LandingHeaderProps) => {
  return (
    <header className="sticky top-0 z-(--z-sticky) border-b border-border/70 bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-wide items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label={homeLabel} className="shrink-0 rounded-md">
          <Image
            src="/brand/logo.svg"
            alt=""
            width={123}
            height={24}
            priority
            unoptimized
          />
        </Link>

        <nav aria-label={navLabel} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <ButtonLink href={link.href} variant="ghost" size="sm">
                  {link.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={secondaryCta.href} variant="ghost" size="sm">
            {secondaryCta.label}
          </ButtonLink>
          <ButtonLink href={primaryCta.href} size="sm">
            {primaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
