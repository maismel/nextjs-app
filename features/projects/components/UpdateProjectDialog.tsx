import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectCvForm } from "@/features/projects/components/ProjectCvForm";
import { useProjectActions } from "@/features/projects/hooks/useProjectActions";
import { useParams } from "next/navigation";

interface UpdateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProject: string;
}

export const UpdaterojectDialog = ({
  open,
  onOpenChange,
  selectedProject,
}: UpdateProjectDialogProps) => {
  const { cvId } = useParams<{ cvId: string }>();
  const { handleUpdateCvProject } = useProjectActions();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
        </DialogHeader>
        <ProjectCvForm
          onCancel={() => onOpenChange(false)}
          onSubmit={(values) => {
            console.log("values", values);
            console.log("cvId", cvId);
            console.log("selectedProject", selectedProject);
            handleUpdateCvProject({
              cvId,
              projectId: selectedProject,
              ...values,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
