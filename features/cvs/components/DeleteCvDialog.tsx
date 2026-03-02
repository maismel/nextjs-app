"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface CreateCvDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}
export const DeleteCvDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: CreateCvDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create CV</DialogTitle>
        </DialogHeader>
        <DialogDescription>Are you sure you want to delete?</DialogDescription>
        <DialogFooter>
          <Button
            variant="ghost"
            size="lg"
            className="w-40"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="w-40"
            onClick={() => {
                onConfirm();
                onOpenChange(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
