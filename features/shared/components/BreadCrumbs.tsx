"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { navItems } from "@/features/navigation/components/AppSidebar";
import { useGetCvById } from "@/features/cvs/api/getCvById";
import { useGetUser } from "@/features/users/api/getUser";
import { cn } from "@/lib/utils";

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter(Boolean) || [];

  const cvId = pathSegments[0] === "cvs" ? pathSegments[1] : '';
  const userId = pathSegments[0] === "users" ? pathSegments[1] : '';

  const { data: cvData } = useGetCvById(cvId);
  const { data: userData } = useGetUser(userId);

  const breadcrumbItems = pathSegments.map((seg, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    const navItem = navItems.find((item) => item.href === `/${seg}`);
    if (navItem) return { label: navItem.label, href };

    if (cvId && seg === cvId) {
      const label = cvData?.cv?.name ?? seg;
      return { label, href };
    }

    if (userId && seg === userId) {
      const label =
        userData?.user?.profile?.full_name ?? userData?.user?.email ?? seg;
      return { label, href };
    }

    const label = seg.charAt(0).toUpperCase() + seg.slice(1);
    return { label, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem
              className={cn(index % 2 === 1 && "text-destructive")}
            >
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
