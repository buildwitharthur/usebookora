import { redirect } from "next/navigation";

import { getSession } from "@/shared/data-access/session";

export const verifyAuth = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return { ...session, user: session.user };
};
