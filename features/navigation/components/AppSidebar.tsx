"use client";

import { SidebarLg } from "@/components/layout/SidebarLg";
import { MobileNav } from "@/components/layout/MobileNav";
import {
  UsersIcon,
  LanguagesIcon,
  TrendingUpIcon,
  FileUserIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useGetCurrentUser } from "@/features/navigation/api/getCurrentUser";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";

const navItems = [
  { label: "Employees", href: "/", icon: <UsersIcon /> },
  { label: "Skills", href: "/skills", icon: <TrendingUpIcon /> },
  { label: "Languages", href: "/languages", icon: <LanguagesIcon /> },
  { label: "CVs", href: "/cvs", icon: <FileUserIcon /> },
];

export const AppSidebar = () => {
  const currUserId = getUserIdFromToken()?.toString();
  const { data: userData } = useGetCurrentUser(currUserId);
  console.log("Current user data in AppSidebar:", userData);
  
  const pathname = usePathname();
  return (
    <>
      <SidebarLg navItems={navItems} pathname={pathname} />
      <MobileNav navItems={navItems} pathname={pathname} />
    </>
  );
};
