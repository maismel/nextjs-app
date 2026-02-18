import { FormUI } from "./Form";
import { useLogin } from "@/features/auth/api/login";
import { AUTH_CONTENT } from "@/features/auth/constants/constants";
import { validateForm } from "@/features/auth/utils/validateForm";
import { useState } from "react";

export const LoginForm = () => {
  const [loginQuery, { error }] = useLogin();
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const content = AUTH_CONTENT.login;
  const { title, subtitle, btn_frst, btn_sec } = content;

  const handleSubmit = async (email: string, password: string) => {
    setFormError(null);
    if (!validateForm(email, password)) {
      setFormError("Please enter a valid email and password.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await loginQuery({
        variables: { auth: { email, password } },
      });
      console.log("Login token", data?.login.access_token);
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
