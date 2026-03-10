import { CvTabsClient } from "@/features/cvs/components/CvTabsClient";

export default function CvDetailsLayuout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8">
      <CvTabsClient />
      {children}
    </div>
  );
}
