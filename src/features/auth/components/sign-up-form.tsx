"use client";

import { useActionState } from "react";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/features/auth/actions/sign-up";

export default function SignUpForm() {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);
  return (
    <Form action={action} actionState={actionState}>
      <div>
        <Label htmlFor='username'>Username</Label>
        <Input
          type='text'
          placeholder='Username'
          name='username'
          id='username'
          defaultValue={actionState.payload?.get("username") as string}
        />
        <FieldError actionState={actionState} name='username' />
      </div>
      <div>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          placeholder='Email'
          name='email'
          id='email'
          defaultValue={actionState.payload?.get("email") as string}
        />
        <FieldError actionState={actionState} name='email' />
      </div>

      <div>
        <Label htmlFor='password'>Password</Label>
        <Input
          type='password'
          placeholder='Password'
          name='password'
          id='password'
          defaultValue={actionState.payload?.get("password") as string}
        />
        <FieldError actionState={actionState} name='password' />
      </div>

      <div>
        <Label htmlFor='confirmPassword'>Confirm Password</Label>
        <Input
          type='password'
          placeholder='Confirm Password'
          name='confirmPassword'
          id='confirmPassword'
          defaultValue={actionState.payload?.get("confirmPassword") as string}
        />
        <FieldError actionState={actionState} name='confirmPassword' />
      </div>

      <SubmitButton label='Sign Up' />
    </Form>
  );
}
