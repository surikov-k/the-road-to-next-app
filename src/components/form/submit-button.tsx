import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  label: string;
};
export default function SubmitButton({ label }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className='mt-4' type='submit'>
      {pending && <LucideLoaderCircle className='h-4 w-4 animate-spin' />}
      {label}
    </Button>
  );
}
