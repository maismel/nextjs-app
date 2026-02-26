import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface UsersTableToolbarProps {
  value: string;
  onChange: (value: string) => void;
}

export const UsersTableToolbar = ({
  value,
  onChange,
}: UsersTableToolbarProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-full">
        <Input
          name="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by full name..."
          className="max-w-sm rounded-full pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground" />
      </div>
    </div>
  );
};
