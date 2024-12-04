import Link from "next/link";

import CardCompact from "@/components/card-compact";
import SignUpForm from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";

export default function SignUpPage() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <CardCompact
        title='Sign Up'
        description='Create an account to get started'
        content={<SignUpForm />}
        className='w-full max-w-[420px] animate-fade-in-from-top'
        footer={
          <Link
            href={signInPath()}
            className='w-full text-sm text-muted-foreground'
          >
            Have an account? Sign In now
          </Link>
        }
      />
    </div>
  );
}
