"use client";

import { LoaderCircle, SparklesIcon } from "lucide-react";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { useCheckoutSession } from "@/shared/hooks/use-checkout-session";

/** Oferece o upgrade para o Pro, abrindo o checkout do Stripe */
const UpgradeButton = () => {
  const { formAction, isPending, formError } = useCheckoutSession();

  return (
    <form action={formAction} noValidate>
      {/* preventDefault: o menu continua aberto até o checkout carregar ou o erro aparecer */}
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
            <SparklesIcon aria-hidden="true" />
          )}
          {isPending ? "Abrindo pagamento..." : "Fazer upgrade"}
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

export default UpgradeButton;
