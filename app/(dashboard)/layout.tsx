import { AppSidebar } from "@/features/navigation/components/AppSidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen">
      <AppSidebar />

      <div className="flex-1 px-6 py-8">
        {children}
      </div>
    </div>
  );
}
