import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "@/shared/components/ui/button";
import { signOut } from "@/shared/lib/auth";
import StorefrontIllustration from "./storefront-illustration";

type OnboardingLayoutProps = {
  children: React.ReactNode;
};

const signOutAction = async () => {
  "use server";

  await signOut({ redirectTo: "/login" });
};

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <div className="relative isolate flex min-h-dvh flex-col">
      {/* Fundo: gradiente suave na cor da marca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,var(--color-brand-subtle),transparent_70%),linear-gradient(to_bottom,var(--color-canvas),color-mix(in_oklab,var(--color-brand-subtle)_40%,var(--color-canvas)))]"
      />

      <header className="mx-auto flex h-16 w-full max-w-wide items-center justify-between gap-4 px-4 sm:px-6">
        <Image
          src="/brand/logo.svg"
          alt="Bookora"
          width={123}
          height={24}
          priority
          unoptimized
        />

        <form action={signOutAction}>
          <Button type="submit" variant="ghost" size="sm">
            <LogOutIcon className="size-icon-sm" />
            Sair
          </Button>
        </form>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-4 pb-16 sm:px-6">
        {/* Fica no layout para não reanimar ao trocar de etapa */}
        <StorefrontIllustration className="mb-6 w-full max-w-80" />
        {children}
      </main>
    </div>
  );
};

export default OnboardingLayout;
