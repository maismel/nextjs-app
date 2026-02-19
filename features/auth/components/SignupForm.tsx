'use client'

import { useState } from "react";
import { setTokens } from "@/lib/authStore";
import { useSignup } from "@/features/auth/api/signup";
import { AUTH_CONTENT } from "@/features/auth/constants/constants";
import { validateForm } from "@/features/auth/utils/validateForm";
import { FormUI } from "./Form";

export const SignupForm = () => {
  const [signupMutate, { error, loading }] = useSignup();
  const [formError, setFormError] = useState<string | null>(null);

  const content = AUTH_CONTENT.signup;
  const { title, subtitle, btn_frst, btn_sec } = content;

  const handleSubmit = async (email: string, password: string) => {
    setFormError(null);
    if (!validateForm(email, password)) {
      setFormError("Please enter a valid email and password.");
      return;
    }

    const { data } = await signupMutate({
      variables: { auth: { email, password } },
    });
    if (data) {
      setTokens(data?.signup.access_token, data?.signup.refresh_token);
    }
  };

  return (
    <FormUI
      title={title}
      subtitle={subtitle}
      btn_frst={btn_frst}
      btn_sec={btn_sec}
      onSubmit={handleSubmit}
      error={error?.message || formError}
      loading={loading}
    />
  );
};
