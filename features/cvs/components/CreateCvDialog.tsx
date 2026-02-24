import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateCvDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string, education: string, description: string) => void;
}
export const CreateCvDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: CreateCvDialogProps) => {
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive text-center">
            Create CV
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            const name = formData.get("name") as string;
            const education = formData.get("education") as string;
            const description = formData.get("description") as string;

            onSubmit(name, education, description);
            onOpenChange(false);
          }}
        >
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" />
            </Field>
            <Field>
              <Label htmlFor="education">Education</Label>
              <Input id="education" name="education" />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
