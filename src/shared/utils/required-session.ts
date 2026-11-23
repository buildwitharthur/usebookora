import { getSession } from "@/shared/data-access/session";

export const requiredSession = async () => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unexpected error");
  }

  return { ...session, user: session.user };
};
