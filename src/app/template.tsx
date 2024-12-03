import { ReactNode } from "react";

import RedirectToast from "@/components/redirect-toast";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <>
      <>{children}</>
      <RedirectToast />
    </>
  );
}
