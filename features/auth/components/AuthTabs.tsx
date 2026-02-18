"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/features/auth/components/Form";
import { useState } from "react";

export default function AuthTabs() {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as "login" | "signup")}
      className="w-full min-h-screen max-w-xl mx-auto flex flex-col items-center justify-between p-6"
    >
      <TabsList variant="line">
        <TabsTrigger value="login">Войти</TabsTrigger>
        <TabsTrigger value="signup">Создать аккаунт</TabsTrigger>
      </TabsList>

      <TabsContent
        value={tab}
        className="w-full flex flex-col items-center justify-center"
      >
        <Form tab={tab} />
      </TabsContent>
    </Tabs>
  );
}
