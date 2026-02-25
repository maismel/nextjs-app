"use client";

import dynamic from "next/dynamic";

export const CvTabsClient = dynamic(
  () =>
    import("@/features/cvs/components/CvTabs").then((mod) => mod.CvTabs),
  { ssr: false },
);
