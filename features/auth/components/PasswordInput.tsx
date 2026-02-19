"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const PasswordInput = ({
  value,
  onChange,
  placeholder = "Password",
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pr-10"
        autoComplete="current-password"
        name="password"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
        onClick={() => setShow(!show)}
      >
        {show ? (
          <EyeOff className="w-4 h-4 text-foreground/60" />
        ) : (
          <Eye className="w-4 h-4 text-foreground/60" />
        )}
      </Button>
    </div>
  );
};
