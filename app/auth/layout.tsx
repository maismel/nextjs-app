import { AuthTabsClient } from "@/features/auth/components/AuthTabsClient";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6">
      <div className="flex flex-col flex-1 w-full max-w-xl">
        <AuthTabsClient />
        <div className="w-full my-auto">{children}</div>
      </div>
    </div>
  );
}
