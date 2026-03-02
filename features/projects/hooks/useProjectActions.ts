import { useAddCvProject } from "@/features/projects/api/addCvProject";
import { useCreateProject } from "@/features/projects/api/createProject";
import { useRemoveCvProject } from "@/features/projects/api/removeCvProject";
import { AddCvProjectInput, CreateProjectInput, RemoveCvProjectInput } from "cv-graphql";

export const useProjectActions = () => {
  const [createProject] = useCreateProject();
  const [addCvProject] = useAddCvProject()
  const [removeCvProject] = useRemoveCvProject();
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
  return { handleCreateProject, handleAddCvProject, handleRemoveCvProject };
};
