import { Button } from "@/components/ui/button";

interface CvHeaderProps {
  user?: {
    profile?: { full_name?: string };
    position_name?: string;
  };
  onExport?: () => void;
}

export const CvHeader = ({ user, onExport }: CvHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-3xl">
          {user?.profile?.full_name || ""}
        </p>
        <p className="text-lg">{user?.position_name || ""}</p>
      </div>

      <Button
        size="lg"
        className="flex gap-2 items-center text-destructive border border-destructive cursor-pointer"
        onClick={onExport}
      >
        EXPORT PDF
      </Button>
    </div>
  );
};
