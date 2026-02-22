"use client";

import Link from "next/link";
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

interface SidebarLgProps {
  navItems: { label: string; href: string; icon: JSX.Element }[];
  pathname: string;
}

export function SidebarLg({ navItems, pathname }: SidebarLgProps) {
  return (
    <>
      <div className="hidden lg:block">
        <SidebarProvider>
          <Sidebar variant="inset">
            <SidebarContent className="mt-4 flex flex-col gap-4">
              <SidebarMenu className="mt-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
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
            <SidebarFooter className="flex gap-2 text-gray-500">
              {/* {data?.user?.profile?.avatar && (
              <Image
                src={avatarUrl}
                width={32}
                height={32}
                className="rounded-full"
                alt="User avatar"
              />
              {fullName}
            {data?.user?.profile?.full_name || "No user"} */}
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </div>
    </>
  );
}
