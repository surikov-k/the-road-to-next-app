import Link from "next/link";

import CardCompact from "@/components/card-compact";
import SignInForm from "@/features/auth/components/sign-in";
import { passwordForgotPath, signUpPath } from "@/paths";

export default function SignInPage() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <CardCompact
        title='Sign In'
        description='Sign in to get started'
        content={<SignInForm />}
        className='w-full max-w-[420px] animate-fade-in-from-top'
        footer={
          <>
            <Link
              href={signUpPath()}
              className='mr-auto text-sm text-muted-foreground'
            >
              No account yet? Sign Up
            </Link>

            <Link
              href={passwordForgotPath()}
              className='text-sm text-muted-foreground'
            >
              Forgot Password?
            </Link>
          </>
        }
      />
    </div>
  );
}
