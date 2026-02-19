"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AuthTabs = () => {
  const router = useRouter();
  const pathname = usePathname();

  const initialTab = pathname?.includes("/signup") ? "signup" : "login";

  return (
    <Tabs defaultValue={initialTab} className="w-full items-center">
      <TabsList variant="line">
        <TabsTrigger value="login" onClick={() => router.push("/auth/login")}>
          ВОЙТИ
        </TabsTrigger>
        <TabsTrigger value="signup" onClick={() => router.push("/auth/signup")}>
          СОЗДАТЬ
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
