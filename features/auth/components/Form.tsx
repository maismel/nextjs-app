import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LOGIN_CONTENT,
  SIGNUP_CONTENT,
} from "@/features/auth/constants/constants";
import { useState } from "react";
import { useSignup } from "@/features/auth/api/signup";
import { useLogin } from "@/features/auth/api/login";
import { validateForm } from "@/features/auth/utils/validateForm";

export interface FormProps {
  tab: "login" | "signup";
}

export const Form = ({ tab }: FormProps) => {
  const [signupMutate] = useSignup();
  const [loginQuery] = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const content = tab === "login" ? LOGIN_CONTENT : SIGNUP_CONTENT;
  const { title, subtitle, btn_frst, btn_sec } = content;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const isFormValid = validateForm(email, password);
    if (!isFormValid) {
      console.log("Please enter a valid email and password.");
      return;
    }
    const authInput = { email, password };

    if (tab === "signup") {
      const res = await signupMutate({ variables: { auth: authInput } });
      console.log(res);
    } else {
        const { data } = await loginQuery({ variables: { auth: authInput } });
        const token = data?.login.access_token;

        console.log('token', token);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-10">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <form
          className="flex w-full flex-col items-center gap-5"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex flex-col gap-5 w-full max-w-3xs">
            <Button variant="destructive">{btn_frst}</Button>
            <Button variant="ghost">{btn_sec}</Button>
          </div>
        </form>
      </div>
    </>
  );
};
