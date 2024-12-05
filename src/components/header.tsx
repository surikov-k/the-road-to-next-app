"use client";

import { LucideKanban, LucideLogOut } from "lucide-react";
import Link from "next/link";

import SubmitButton from "@/components/form/submit-button";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions/sign-out";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";

export default function Header() {
  // const { user } = await getAuth();

  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <>
      <Link
        href={ticketsPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Tickets
      </Link>

      <form action={signOut}>
        <SubmitButton label='Sign Out' icon={<LucideLogOut />} />
      </form>
    </>
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign in
      </Link>
    </>
  );

  return (
    <nav className='animate-header-from-top supports-backdrop-blur:bg-white/60 fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b bg-background/95 px-5 py-2.5 backdrop-blur'>
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
        {navItems}
      </div>
    </nav>
  );
}
