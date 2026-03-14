"use client";

import Link from "next/link";
import Image from "next/image";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { JSX } from "react/jsx-dev-runtime";

type CurrentUser = {
  profile?: {
    full_name?: string | null;
    avatar?: string | null;
  } | null;
  email?: string | null;
};
interface SidebarLgProps {
  navItems: { label: string; href: string; icon: JSX.Element }[];
  pathname: string;

  currentUserId: string | null;
  currentUser?: CurrentUser;
}

export function SidebarLg({
  navItems,
  pathname,
  currentUser,
  currentUserId,
}: SidebarLgProps & { currentUser?: CurrentUser }) {
  const profileHref = currentUserId
    ? `/users/${currentUserId}/profile`
    : "/users";

  const fullName = currentUser?.profile?.full_name ?? "My profile";
  const avatarUrl = currentUser?.profile?.avatar ?? null;
  return (
    <>
      <div className="hidden lg:block">
        <SidebarProvider>
          <Sidebar variant="inset">
            <SidebarContent className="mt-7 flex flex-col gap-4">
              <SidebarMenu className="mt-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.startsWith(item.href)}
                      size="lg"
                    >
                      <Link
                        key={item.href}
                        href={item.href}
                        className="pl-4 rounded-r-full"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="px-3 pb-3">
              <Link
                href={profileHref}
                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-muted transition-colors"
              >
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    width={32}
                    height={32}
                    className="rounded-full"
                    alt="User avatar"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                    {fullName?.[0]?.toUpperCase() ?? "U"}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="text-sm truncate">{fullName}</div>
                  {currentUser?.email && (
                    <div className="text-xs text-muted-foreground truncate">
                      {currentUser.email}
                    </div>
                  )}
                </div>
              </Link>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </div>
    </>
  );
}
