import Image from "next/image";
import Link from "next/link";
import type { LinkItem } from "@/shared/types";

export type LandingFooterProps = {
  homeLabel: string;
  navLabel: string;
  tagline: string;
  links: LinkItem[];
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
            className="inline-block rounded-md"
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
                  className="rounded-sm text-fg-secondary transition-colors hover:text-fg"
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
