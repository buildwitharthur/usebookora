"use client";

import { CreditCardIcon, SparklesIcon } from "lucide-react";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import type { PlanId } from "@/shared/constants/plans";

type SubscriptionButtonProps = {
  planId: PlanId;
};

/** No Basic oferece o upgrade; no Pro, o gerenciamento da assinatura */
const SubscriptionButton = ({ planId }: SubscriptionButtonProps) => {
  // TODO: ligar ao checkout e ao portal do Stripe
  if (planId === "basic") {
    return (
      <DropdownMenuItem className="[&_svg]:text-brand">
        <SparklesIcon />
        Fazer upgrade
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem className="[&_svg]:text-brand">
      <CreditCardIcon />
      Gerenciar assinatura
    </DropdownMenuItem>
  );
};

export default SubscriptionButton;
