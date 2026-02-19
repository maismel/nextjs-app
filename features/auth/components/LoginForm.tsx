import { useState } from "react";
import { setTokens } from "@/lib/authStore";
import { useLogin } from "@/features/auth/api/login";
import { AUTH_CONTENT } from "@/features/auth/constants/constants";
import { validateForm } from "@/features/auth/utils/validateForm";
import { FormUI } from "./Form";

export const LoginForm = () => {
  const [loginQuery, { error, loading }] = useLogin();
  const [formError, setFormError] = useState<string | null>(null);

  const content = AUTH_CONTENT.login;
  const { title, subtitle, btn_frst, btn_sec } = content;

  const handleSubmit = async (email: string, password: string) => {
    setFormError(null);
    if (!validateForm(email, password)) {
      setFormError("Please enter a valid email and password.");
      return;
    }
    
    const { data } = await loginQuery({
      variables: { auth: { email, password } },
    });
    if (data) {
      setTokens(data?.login.access_token, data?.login.refresh_token);
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
