"use client";

import { CvsTableToolbar } from "@/features/shared/ui/CvsTableToolbar";
import { useState } from "react";
import { useSortTable } from "@/hooks/useSortTable";
import { AllProjectsTable } from "@/features/projects/components/AllProjectsTable";
import { useGetUserProjects } from "@/features/projects/api/getUserProjects";
import { useParams } from "next/navigation";
import { AddProjectDialog } from "@/features/projects/components/AddProjectDialog";
import { useProjectActions } from "@/features/projects/hooks/useProjectActions";
import { UpdateProjectDialog } from "@/features/projects/components/UpdateProjectDialog";
import { Preloader } from "@/components/ui/Preloader";

export type columnOptions = "name" | "domain" | "start_date" | "end_date";

export const columnNames: {
  label: string;
  key: columnOptions;
  sortable: boolean;
}[] = [
  { label: "Name", key: "name", sortable: true },
  { label: "Domain", key: "domain", sortable: false },
  { label: "Start Date", key: "start_date", sortable: false },
  { label: "End Date", key: "end_date", sortable: false },
];

export const CvProjectsPage = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const { data, loading } = useGetUserProjects(cvId ?? "");
  const { handleRemoveCvProject } = useProjectActions();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [projectToUpdate, setProjectToUpdate] = useState("");
  const userProjects = data?.cv.projects ?? [];

  const normalizedProjects = userProjects.map((p) => ({
    ...p,
    end_date: p.end_date ?? undefined,
  }));
  const { processedData, search, setSearch, handleSort } = useSortTable(
    normalizedProjects,
    "name",
    ["name", "domain"],
  );

  const openCreateModal = () => {
    setIsCreateDialogOpen(true);
  };

  const handleUpdateClick = (id: string) => {
    setProjectToUpdate(id);
    setIsUpdateDialogOpen(true);
  };

  const removeProject = (projectId: string) => {
    handleRemoveCvProject({ cvId, projectId });
  };

  return (
    <>
      <Preloader loading={loading} />
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
      <AddProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
      <UpdateProjectDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        selectedProject={projectToUpdate}
      />
    </>
  );
};
