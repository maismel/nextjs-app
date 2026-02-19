"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Preloader } from "@/components/ui/Preloader";
import { PasswordInput } from "@/features/auth/components/PasswordInput";

interface AuthFormUIProps {
  title: string;
  subtitle: string;
  btn_frst: string;
  btn_sec: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export const FormUI = ({
  title,
  subtitle,
  btn_frst,
  btn_sec,
  onSubmit,
  loading,
  error,
}: AuthFormUIProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <>
      {loading && <Preloader />}
      <div className="w-full flex flex-col gap-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <form
          autoComplete="on"
          className="flex w-full flex-col items-center gap-y-6"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col items-center gap-5">
            <Input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col gap-2 w-full max-w-55">
            <Button variant="destructive" type="submit" className="h-12">
              {btn_frst}
            </Button>
            <Button variant="ghost" className="h-12 text-foreground/60">
              {btn_sec}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
