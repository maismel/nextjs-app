'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const navItems = [
    { label: "Employees", href: "/" },
    { label: "Skills", href: "/skills" },
    { label: "Languages", href: "/languages" },
    { label: "CVs", href: "/cvs" },
  ];

  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="mt-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block p-4 rounded-r-full ${
                pathname === item.href
                  ? "bg-gray-200 text-black"
                  : "hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </SidebarContent>
        <SidebarFooter className="flex gap-2 text-gray-500">
            {/* {data?.user?.profile?.avatar && (
              <Image
                src={data?.user?.profile?.avatar || ""}
                width={32}
                height={32}
                className="rounded-full"
                alt="User avatar"
              />
            )}
            {data?.user?.email || "No user"} */}
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
