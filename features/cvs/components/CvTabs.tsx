"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CvTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cvId } = useParams();

  const currentTab = pathname.split("/").pop();

  const handleChange = (value: string) => {
    router.push(`/cvs/${cvId}/${value}`);
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleChange}
      className="w-full items-start gap-10"
    >
      <TabsList variant="line">
        <TabsTrigger value="details">DETAILS</TabsTrigger>
        <TabsTrigger value="skills">SKILLS</TabsTrigger>
        <TabsTrigger value="projects">PROJECTS</TabsTrigger>
        <TabsTrigger value="preview">PREVIEW</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
