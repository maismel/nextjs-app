import { useAddCvProject } from "@/features/projects/api/addCvProject";
import { useCreateProject } from "@/features/projects/api/createProject";
import { useRemoveCvProject } from "@/features/projects/api/removeCvProject";
import { useUpdateCvProject } from "@/features/projects/api/updateCvProject";
import { AddCvProjectInput, CreateProjectInput, RemoveCvProjectInput, UpdateCvProjectInput } from "cv-graphql";

export const useProjectActions = () => {
  const [createProject] = useCreateProject();
  const [addCvProject] = useAddCvProject()
  const [removeCvProject] = useRemoveCvProject();
  const [updateCvProject] = useUpdateCvProject();
  const handleCreateProject = async (input: CreateProjectInput) => {
    await createProject({
      variables: {
        project: {
          ...input,
        },
      },
      refetchQueries: ["GetProjects"],
    });
  };

  const handleAddCvProject = async (input: AddCvProjectInput) => {
    await addCvProject({
      variables: {
        project: {
          ...input,
        },
      },
      refetchQueries: ["GetUserProjects"],
    });
  };

  const handleUpdateCvProject = async (input: UpdateCvProjectInput) => {
    await updateCvProject({
      variables: {
        project: {
          ...input,
        },
      },
      refetchQueries: ["GetUserProjects"],
    });
  };

  const handleRemoveCvProject = async (input: RemoveCvProjectInput) => {
    await removeCvProject({
      variables: {
        project: {
          ...input,
        },
      },
      refetchQueries: ["GetUserProjects"],
    });
  };
  return {
    handleCreateProject,
    handleAddCvProject,
    handleRemoveCvProject,
    handleUpdateCvProject,
  };
};
