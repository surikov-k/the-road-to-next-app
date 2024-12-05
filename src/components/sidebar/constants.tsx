import { LucideBook, LucideLibrary } from "lucide-react";

import { NavItem } from "@/components/sidebar/types";
import { homePath, ticketsPath } from "@/paths";

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
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
