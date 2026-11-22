import { redirect } from "next/navigation";

import { auth } from "@/shared/lib/auth";

export const verifyAuth = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
};
