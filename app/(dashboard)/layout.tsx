"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/authStore";
import { AppSidebar } from "@/features/navigation/components/AppSidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <div className="flex flex-col lg:flex-row-reverse h-screen w-screen bg-gray-100 text-gray-900">
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
