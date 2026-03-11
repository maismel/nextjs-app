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
import { useIsClient } from "@/features/shared/hooks/useIsClient";

export const AppSidebar = () => {
  const pathname = usePathname();
  const isClient = useIsClient();

  const currUserId = isClient
    ? (getUserIdFromToken()?.toString() ?? null)
    : null;

  const { data: userData } = useGetCurrentUser(currUserId ?? undefined);

  const navItems = [
    { label: "Employees", href: "/users", icon: <UsersIcon /> },
    { label: "Skills", href: "/skills", icon: <TrendingUpIcon /> },
    { label: "Languages", href: "/languages", icon: <LanguagesIcon /> },
    { label: "CVs", href: "/cvs", icon: <FileUserIcon /> },
  ];

  return (
    <>
      <SidebarLg
        navItems={navItems}
        pathname={pathname}
        currentUserId={currUserId}
        currentUser={userData?.user}
      />
      <MobileNav navItems={navItems} pathname={pathname} />
    </>
  );
};
