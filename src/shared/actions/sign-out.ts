"use server";

import { signOut } from "@/shared/lib/auth";

export const signOutAction = async () => {
  await signOut({ redirectTo: "/login" });
};
