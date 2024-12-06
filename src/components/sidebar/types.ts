import { ReactElement } from "react";

export type NavItem = {
  href: string;
  icon: ReactElement;
  title: string;
  separator?: boolean;
};
