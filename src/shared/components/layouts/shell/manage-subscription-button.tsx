"use client";

import { CreditCardIcon, LoaderCircle } from "lucide-react";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { usePortalSession } from "@/shared/hooks/use-portal-session";

/** Abre o portal do Stripe: cartão, faturas e cancelamento */
const ManageSubscriptionButton = () => {
  const { formAction, isPending, formError } = usePortalSession();

  return (
    <form action={formAction} noValidate>
      {/* preventDefault: o menu continua aberto até o portal carregar ou o erro aparecer */}
      <DropdownMenuItem
        asChild
        disabled={isPending}
        onSelect={(event) => event.preventDefault()}
        className="w-full [&_svg]:text-brand"
      >
        <button type="submit" disabled={isPending}>
          {isPending ? (
            <LoaderCircle className="animate-spin" aria-hidden="true" />
          ) : (
            <CreditCardIcon aria-hidden="true" />
          )}
          {isPending ? "Abrindo assinatura..." : "Gerenciar assinatura"}
        </button>
      </DropdownMenuItem>

      {formError && (
        <p role="alert" className="px-2 py-1.5 text-xs text-danger">
          {formError}
        </p>
      )}
    </form>
  );
};

export default ManageSubscriptionButton;
