"use client";
import { LucideLoaderCircle } from "lucide-react";
import { cloneElement, ReactElement } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  label?: string;
  icon?: ReactElement;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

export default function SubmitButton({
  label,
  icon,
  size,
  variant,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type='submit' variant={variant} size={size}>
      {pending && <LucideLoaderCircle className='h-4 w-4 animate-spin' />}
      {label}
      {pending ? null : icon ? (
        <span className=''>{cloneElement(icon, { className: "h-4 w-4" })}</span>
      ) : null}
    </Button>
  );
}
