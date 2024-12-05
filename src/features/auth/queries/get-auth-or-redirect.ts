import { redirect } from "next/navigation";

import { getAuth } from "@/features/auth/queries/get-auth";
import { signInPath } from "@/paths";

export async function getAuthOrRedirect() {
  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  return auth;
}
