"use client";

import { useActionState } from "react";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/features/auth/actions/sign-in";

export default function SignInForm() {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);
  return (
    <Form action={action} actionState={actionState}>
      <div>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' placeholder='Email' name='email' id='email' />
        <FieldError actionState={actionState} name='email' />
      </div>

      <div>
        <Label htmlFor='password'>Password</Label>
        <Input
          type='password'
          placeholder='Password'
          name='password'
          id='password'
        />
        <FieldError actionState={actionState} name='password' />
      </div>

      <SubmitButton label='Sign In' />
    </Form>
  );
}
