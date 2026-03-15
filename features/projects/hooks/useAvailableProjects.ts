import { useGetProjects } from "@/features/projects/api/getProjects";
import { useGetUserProjects } from "@/features/projects/api/getUserProjects";

export const useAvailableProjects = (cvId: string) => {
  const { data: projectsData } = useGetProjects();
  const { data: cvProjectsData } = useGetUserProjects(cvId);

  const projects = projectsData?.projects ?? [];
  const cvProjects = cvProjectsData?.cv.projects ?? [];

  const cvProjectNames = new Set(cvProjects.map((p) => p.name));

  return projects.filter((p) => !cvProjectNames.has(p.name));
};
