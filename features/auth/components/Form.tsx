"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Preloader } from "@/components/ui/Preloader";

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
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <form
          className="flex w-full flex-col items-center gap-15"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col items-center gap-5">
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
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col gap-2 w-full max-w-3xs">
            <Button variant="destructive" type="submit">
              {btn_frst}
            </Button>
            <Button variant="ghost">{btn_sec}</Button>
          </div>
        </form>
      </div>
    </>
  );
};
