"use client";

import { CreditCardIcon, LoaderCircle, SparklesIcon } from "lucide-react";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import type { PlanId } from "@/shared/constants/plans";
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

type SubscriptionButtonProps = {
  planId: PlanId;
};

/** No Basic oferece o upgrade; no Pro, o gerenciamento da assinatura */
const SubscriptionButton = ({ planId }: SubscriptionButtonProps) => {
  if (planId === "basic") {
    return <UpgradeButton />;
  }

  // TODO: ligar ao portal do Stripe
  return (
    <DropdownMenuItem className="[&_svg]:text-brand">
      <CreditCardIcon />
      Gerenciar assinatura
    </DropdownMenuItem>
  );
};

export default SubscriptionButton;
