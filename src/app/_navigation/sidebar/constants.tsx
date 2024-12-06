import { LucideBook, LucideCircleUser, LucideLibrary } from "lucide-react";

import { NavItem } from "@/app/_navigation/sidebar/types";
import { accountProfilePath, homePath, ticketsPath } from "@/paths";

export const navItems: NavItem[] = [
  {
    href: homePath(),
    icon: <LucideLibrary />,
    title: "All Tickets",
  },
  {
    href: ticketsPath(),
    icon: <LucideBook />,
    title: "My Tickets",
  },
  {
    separator: true,
    href: accountProfilePath(),
    icon: <LucideCircleUser />,
    title: "Account",
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
