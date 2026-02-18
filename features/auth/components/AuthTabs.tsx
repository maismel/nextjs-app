"use client";

import { JSX, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { SignupForm } from "@/features/auth/components/SignupForm";

const TABS: Record<
  "login" | "signup",
  { label: string; component: JSX.Element }
> = {
  login: {
    label: "ВОЙТИ",
    component: <LoginForm />,
  },
  signup: {
    label: "СОЗДАТЬ",
    component: <SignupForm />,
  },
};

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState<keyof typeof TABS>("login");

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as keyof typeof TABS)}
      className="w-full min-h-screen max-w-xl mx-auto flex flex-col items-center justify-between p-6"
    >
      <TabsList variant="line">
        {Object.entries(TABS).map(([key, { label }]) => (
          <TabsTrigger key={key} value={key}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.entries(TABS).map(([key, { component }]) => (
        <TabsContent
          key={key}
          value={key}
          className="w-full flex flex-col items-center justify-center"
        >
          {component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
