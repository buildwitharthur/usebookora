import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

type HeaderLink = {
  label: string;
  href: string;
};

export type LandingHeaderProps = {
  homeLabel: string;
  navLabel: string;
  navLinks: HeaderLink[];
  secondaryCta: HeaderLink;
  primaryCta: HeaderLink;
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
        <Link
          href="/"
          aria-label={homeLabel}
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
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
                <Button asChild variant="ghost" size="sm">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
