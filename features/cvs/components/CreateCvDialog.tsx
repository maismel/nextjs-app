"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CvForm } from "@/features/cvs/components/CvForm";
import { useCvsActions } from "@/features/cvs/hooks/useCvsActions";

interface CreateCvDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const CreateCvDialog = ({ open, onOpenChange }: CreateCvDialogProps) => {
  const { handleCreateCv } = useCvsActions();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create CV</DialogTitle>
        </DialogHeader>
        <CvForm
          buttonText="Create"
          onSubmit={async (values) => {
            await handleCreateCv(values);
            onOpenChange(false);
          }}
          onCancelButton={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
