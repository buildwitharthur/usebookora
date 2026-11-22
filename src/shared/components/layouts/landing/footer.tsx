import Image from "next/image";
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

export type LandingFooterProps = {
  homeLabel: string;
  navLabel: string;
  tagline: string;
  links: FooterLink[];
  copyright: string;
};

const LandingFooter = ({
  homeLabel,
  navLabel,
  tagline,
  links,
  copyright,
}: LandingFooterProps) => {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-wide flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-narrow">
          <Link
            href="/"
            aria-label={homeLabel}
            className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          >
            <Image
              src="/brand/logo.svg"
              alt=""
              width={123}
              height={24}
              unoptimized
            />
          </Link>
          <p className="mt-3 text-sm text-fg-muted">{tagline}</p>
        </div>

        <nav aria-label={navLabel}>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm text-fg-secondary transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-wide px-4 py-6 text-xs text-fg-muted sm:px-6">
          {copyright}
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
