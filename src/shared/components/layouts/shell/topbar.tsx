import React from "react";
import PageTitle from "./page-title";
import ShareActions from "./share-actions";

type TopbarProps = {
  slug: string;
  /** Gatilho do drawer, visível só abaixo de `lg` */
  mobileNav: React.ReactNode;
};

const Topbar = ({ slug, mobileNav }: TopbarProps) => {
  return (
    <header className="sticky top-0 z-(--z-sticky) flex h-12 shrink-0 items-center gap-2 border-b border-border bg-surface/85 px-4 backdrop-blur-md lg:px-6">
      {mobileNav}
      <PageTitle />
      <div className="ml-auto">
        <ShareActions slug={slug} />
      </div>
    </header>
  );
};

export default Topbar;
