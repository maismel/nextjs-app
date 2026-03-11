import { CvsList } from "@/features/cvs/pages/CvsList";

export const metadata = {
  title: "CRM App - Dashboard",
};

export default function CvsPage() {
  return (
    <>
      <h1 className="text-sm text-muted-foreground mb-2">CVs</h1>
      <CvsList />
    </>
  );
}
