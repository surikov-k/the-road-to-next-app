import { buttonVariants } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/paths";
import { LucideKanban } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <nav className='supports-backdrop-blur:bg-white/60 bg-background/95 fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b px-5 py-2.5 backdrop-blur'>
      <div>
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban color='lime' />
          <span className='text-lg font-bold'>TicketBounty</span>
        </Link>
      </div>
      <div>
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
