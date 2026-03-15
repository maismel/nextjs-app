import { AppSidebar } from "@/features/navigation/components/AppSidebar";
import { Breadcrumbs } from "@/features/shared/components/BreadCrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "CRM System",
    template: "%s | CRM System",
  },
  description:
    "CRM system for managing users, skills, and professional CVs. Create, edit, and export CVs while organizing candidate data in one place.",
  keywords: [
    "CRM",
    "CV management",
    "resume management",
    "candidate management",
    "HR system",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen">
      <AppSidebar />
      <div className="flex-1 px-6 py-4">
        <div className="flex flex-col gap-2">
          <Breadcrumbs />
          {children}
        </div>
      </div>
    </div>
  );
}
