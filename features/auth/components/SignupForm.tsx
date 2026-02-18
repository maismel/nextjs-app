import { FormUI } from "./Form";
import { useSignup } from "@/features/auth/api/signup";
import { AUTH_CONTENT } from "@/features/auth/constants/constants";
import { validateForm } from "@/features/auth/utils/validateForm";
import { useState } from "react";

export const SignupForm = () => {
  const [signupMutate, { error }] = useSignup();
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const content = AUTH_CONTENT.signup;
    const { title, subtitle, btn_frst, btn_sec } = content;

  const handleSubmit = async (email: string, password: string) => {
    setFormError(null);
    if (!validateForm(email, password)) {
      setFormError("Please enter a valid email and password.");
      return;
    }

    setLoading(true);
    try {
      await signupMutate({
        variables: { auth: { email, password } },
      });
    } finally {
      setLoading(false);
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
