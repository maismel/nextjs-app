"use client";

import { CvsTableToolbar } from "@/features/shared/ui/CvsTableToolbar";
import { useState } from "react";
import { useSortTable } from "@/features/cvs/hooks/useSortTable";
import { AllProjectsTable } from "@/features/projects/components/AllProjectsTable";
import { useGetUserProjects } from "@/features/projects/api/getUserProjects";
import { useParams } from "next/navigation";
import { AllProjectsDialog } from "@/features/projects/components/AllProjectsDialog";
import { useProjectActions } from "@/features/projects/hooks/useProjectActions";
import { UpdateCvProjectInput } from "cv-graphql";
import { UpdaterojectDialog } from "@/features/projects/components/UpdateProjectDialog";

export type columnOptions = "name" | "domain" | "start_date" | "end_date";

const columnNames: {
  label: string;
  key: columnOptions;
  sortable: boolean;
}[] = [
  { label: "Name", key: "name", sortable: true },
  { label: "Domail", key: "domain", sortable: false },
  { label: "Start Date", key: "start_date", sortable: false },
  { label: "End Date", key: "end_date", sortable: false },
];

export const CvProjectsPage = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const { data } = useGetUserProjects(cvId ?? "");
  const { handleUpdateCvProject, handleRemoveCvProject } = useProjectActions();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [projectToUpdate, setProjectToUpdate] = useState('')
console.log("projectToUpdate", projectToUpdate);
  const userProjects = data?.cv.projects ?? [];
  console.log("userProjects", userProjects);

  const searchableKeys = [
    "name",
    "domain",
  ] satisfies (keyof (typeof userProjects)[number])[];

  const { processedData, search, setSearch, handleSort } = useSortTable(
    userProjects,
    "name",
    searchableKeys,
  );

  const openCreateModal = () => {
    setIsCreateDialogOpen(true);
  };

  const openUpdateModal = () => {
    setIsUpdateDialogOpen(true);
  };

  const updateProject = (project: UpdateCvProjectInput) => {
    handleUpdateCvProject({ ...project, cvId });
  };
  const handleUpdateClick = (id: string) => {
    setProjectToUpdate(id);
    setIsUpdateDialogOpen(true);
  };

  const removeProject = (projectId: string) => {
    handleRemoveCvProject({cvId, projectId})
  }

  return (
    <>
      <CvsTableToolbar
        value={search}
        onChange={setSearch}
        buttonText="ADD PROJECT"
        onButtonClick={openCreateModal}
      />
      <AllProjectsTable
        data={processedData}
        columnNames={columnNames}
        handleSort={handleSort}
        onDelete={removeProject}
        onUpdate={handleUpdateClick}
      />
      {/* <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateProject}
      /> */}
      <AllProjectsDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
      <UpdaterojectDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        selectedProject={projectToUpdate}
      />
    </>
  );
};
