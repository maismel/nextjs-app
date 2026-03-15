import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetUserProjects } from "@/features/projects/api/getUserProjects";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { useProjectActions } from "@/features/projects/hooks/useProjectActions";
import { useParams } from "next/navigation";

interface UpdateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProject: string;
}

export const UpdateProjectDialog = ({
  open,
  onOpenChange,
  selectedProject,
}: UpdateProjectDialogProps) => {
  const { cvId } = useParams<{ cvId: string }>();
  const { data: projectsData } = useGetUserProjects(cvId);
  const { handleUpdateCvProject } = useProjectActions();

  const allProjects = projectsData?.cv.projects;
  const selectedProjectData = allProjects?.find(
    (project) => project.id === selectedProject,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-4xl h-[80vh] flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
        </DialogHeader>
        <ProjectForm
          onCancel={() => onOpenChange(false)}
          onSubmit={(values) => {
            handleUpdateCvProject({
              cvId,
              projectId: selectedProject,
              ...values,
            });
            onOpenChange(false);
          }}
          projectData={selectedProjectData}
        />
      </DialogContent>
    </Dialog>
  );
};
