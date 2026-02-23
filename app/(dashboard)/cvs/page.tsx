import { CvsList } from "@/features/cvs/components/CvsList";

export const metadata = {
  title: "CRM App - Dashboard",
};

export default function CvsPage() {
  return (
    <div className="p-6">
      <h1 className="text-sm text-muted-foreground mb-2">CVs</h1>
      <CvsList />
    </div>
  );
}
