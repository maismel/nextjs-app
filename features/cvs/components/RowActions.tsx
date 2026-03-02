import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type RowAction = {
  label: string;
  onClick: (id: string) => void;
  variant?: "default" | "destructive";
  showSeparatorBefore?: boolean;
};

interface RowActionsProps {
  id: string;
  actions: RowAction[];
}

export const RowActions = ({ id, actions }: RowActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <EllipsisVerticalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <div key={index}>
            {action.showSeparatorBefore && <DropdownMenuSeparator />}
            <DropdownMenuItem
              variant={action.variant}
              onClick={() => action.onClick(id)}
            >
              {action.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
