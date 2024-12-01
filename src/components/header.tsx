import { LucideKanban } from "lucide-react";
import Link from "next/link";

import ThemeSwitcher from "@/components/theme/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/paths";

export default function Header() {
  return (
    <nav className='supports-backdrop-blur:bg-white/60 fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b bg-background/95 px-5 py-2.5 backdrop-blur'>
      <div>
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban color='lime' />
          <span className='text-lg font-bold'>TicketBounty</span>
        </Link>
      </div>
      <div className='flex items-center gap-1'>
        <ThemeSwitcher />
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "outline" })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
}
