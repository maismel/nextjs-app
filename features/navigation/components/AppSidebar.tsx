"use client";

import { SidebarLg } from "@/features/navigation/components/SidebarLg";
import { MobileNav } from "@/features/navigation/components/MobileNav";
import {
  UsersIcon,
  LanguagesIcon,
  TrendingUpIcon,
  FileUserIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useGetCurrentUser } from "@/features/navigation/api/getCurrentUser";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";
import { useIsClient } from "@/features/shared/hooks/useIsClient";
import { clearTokens } from "@/lib/authStore";
import { ConfirmDialog } from "@/features/shared/components/ConfirmDialog";
import { useState } from "react";

export const navItems = [
  { label: "Employees", href: "/users", icon: <UsersIcon /> },
  { label: "Skills", href: "/skills", icon: <TrendingUpIcon /> },
  { label: "Languages", href: "/languages", icon: <LanguagesIcon /> },
  { label: "CVs", href: "/cvs", icon: <FileUserIcon /> },
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isClient = useIsClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const currUserId = isClient
    ? (getUserIdFromToken()?.toString() ?? null)
    : null;

  const { data: userData } = useGetCurrentUser(currUserId ?? undefined);

  const logout = () => {
    clearTokens();
    router.replace("/auth/login");
  };

  return (
    <>
      <SidebarLg
        navItems={navItems}
        pathname={pathname}
        currentUserId={currUserId}
        currentUser={userData?.user}
        onLogout={() => setIsDialogOpen(true)}
      />
      <MobileNav
        navItems={navItems}
        pathname={pathname}
        onLogout={() => setIsDialogOpen(true)}
      />
      <ConfirmDialog
        title="Logout"
        description="Are you sure you want to logout?"
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={logout}
      />
    </>
  );
};
