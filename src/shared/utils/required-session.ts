import { auth } from "@/shared/lib/auth";

export const requiredSession = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unexpected error");
  }

  return session;
};
