"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const UserTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useParams<{ userId: string }>();

  const current = pathname.includes("/skills")
    ? "skills"
    : pathname.includes("/languages")
      ? "languages"
      : "profile";

  const handleChange = (value: string) => {
    router.push(`/users/${userId}/${value}`);
  };

  return (
    <Tabs
      value={current}
      onValueChange={handleChange}
      className="w-full items-start gap-10"
    >
      <TabsList variant="line">
        <TabsTrigger value="profile">PROFILE</TabsTrigger>
        <TabsTrigger value="skills">SKILLS</TabsTrigger>
        <TabsTrigger value="languages">LANGUAGES</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
