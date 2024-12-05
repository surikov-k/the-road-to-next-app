import { ReactNode } from "react";

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

interface AuthenticationLayoutProps {
  children: ReactNode;
}

export default async function AuthenticatedLayout({
  children,
}: AuthenticationLayoutProps) {
  await getAuthOrRedirect();

  return <>{children}</>;
}
