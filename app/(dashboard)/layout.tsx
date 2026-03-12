import { AppSidebar } from "@/features/navigation/components/AppSidebar";
import { Breadcrumbs } from "@/features/shared/components/BreadCrumbs";

export default function ProtectedLayout({
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
