import type { PlanId } from "@/shared/constants/plans";
import ManageSubscriptionButton from "./manage-subscription-button";
import UpgradeButton from "./upgrade-button";

type SubscriptionButtonProps = {
  planId: PlanId;
};

/** No Basic oferece o upgrade; no Pro, o gerenciamento da assinatura */
const SubscriptionButton = ({ planId }: SubscriptionButtonProps) => {
  if (planId === "basic") {
    return <UpgradeButton />;
  }

  return <ManageSubscriptionButton />;
};

export default SubscriptionButton;
