"use client";

import { CvsTableToolbar } from "@/features/shared/ui/CvsTableToolbar";
import { useGetProjects } from "@/features/projects/api/getProjects";
import { useSortTable } from "@/hooks/useSortTable";
import { AllProjectsTable } from "@/features/projects/components/AllProjectsTable";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ProjectCvForm } from "@/features/projects/components/ProjectCvForm";
import { useProjectActions } from "@/features/projects/hooks/useProjectActions";
import { useGetUserProjects } from "@/features/projects/api/getUserProjects";

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

interface CvProjectsPageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AllProjectsDialog = ({
  open,
  onOpenChange,
}: CvProjectsPageProps) => {
  const { cvId } = useParams<{ cvId: string }>();

  const { data: cvProjectsData } = useGetUserProjects(cvId ?? "");
  const { data: projectsData } = useGetProjects();

  const { handleAddCvProject } = useProjectActions();

  const [selectedProject, setSelectedProject] = useState("");

  const projects = projectsData?.projects ?? [];
  const cvProjects = cvProjectsData?.cv.projects ?? [];
  const cvProjectNames = new Set(cvProjects.map((p) => p.name));
  const availableProjects = projects.filter(
    (project) => !cvProjectNames.has(project.name),
  );

  const selectedProjectData = availableProjects.find(
    (p) => p.id === selectedProject,
  );

  const { processedData, search, setSearch, handleSort } = useSortTable(
    availableProjects,
    "name",
    ["name", "domain"],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedProject("");
        }
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="lg:max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {selectedProject ? "Add Project Details" : "Add Project"}
          </DialogTitle>
        </DialogHeader>
        {!selectedProject ? (
          <>
            <CvsTableToolbar value={search} onChange={setSearch} />
            <AllProjectsTable
              data={processedData}
              columnNames={columnNames}
              handleSort={handleSort}
              onAdd={setSelectedProject}
            />
          </>
        ) : (
          <ProjectCvForm
            onCancel={() => setSelectedProject("")}
            onSubmit={(values) => {
              handleAddCvProject({
                cvId,
                projectId: selectedProject,
                ...values,
              });
            }}
            projectStartDate={
              selectedProjectData?.start_date
                ? new Date(selectedProjectData.start_date)
                : undefined
            }
            projectEndDate={
              selectedProjectData?.end_date
                ? new Date(selectedProjectData.end_date)
                : undefined
            }
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
