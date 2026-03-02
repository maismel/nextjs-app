import { SearchIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CvsTableToolbarProps {
  value: string;
  onChange: (value: string) => void;
  onButtonClick?: () => void;
  buttonText?: string;
}

export const CvsTableToolbar = ({
  value,
  onChange,
  onButtonClick,
  buttonText,
}: CvsTableToolbarProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="relative w-full">
        <Input
          name="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-sm rounded-full pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 p-1" />
      </div>
      {buttonText && onButtonClick && (
        <Button
          variant="ghost"
          size="lg"
          className="flex gap-2 items-center text-destructive"
          onClick={onButtonClick}
        >
          <PlusIcon />
          {buttonText}
        </Button>
      )}
    </div>
  );
};
