"use server";

import { signOut } from "@/shared/lib/auth";

// Exceção do Auth.js: o próprio `signOut` redireciona, pelo `redirectTo`
export const signOutAction = async () => {
  await signOut({ redirectTo: "/login" });
};
