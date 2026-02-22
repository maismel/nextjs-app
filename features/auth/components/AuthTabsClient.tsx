"use client";

import dynamic from "next/dynamic";

export const AuthTabsClient = dynamic(
  () =>
    import("@/features/auth/components/AuthTabs").then((mod) => mod.AuthTabs),
  { ssr: false },
);
