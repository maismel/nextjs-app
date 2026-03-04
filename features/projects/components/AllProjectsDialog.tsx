"use client";

import { CvsTableToolbar } from "@/features/shared/ui/CvsTableToolbar";
import { useGetProjects } from "@/features/projects/api/getProjects";
import { useSortTable } from "@/features/cvs/hooks/useSortTable";
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
  const { data } = useGetProjects();
  const { handleAddCvProject } = useProjectActions();
  console.log("data", data?.projects);
  console.log("cvId", cvId);

  const [selectedProject, setSelectedProject] = useState("");

  const projects = data?.projects ?? [];

  const searchableKeys = [
    "name",
    "domain",
  ] satisfies (keyof (typeof projects)[number])[];

  const { processedData, search, setSearch, handleSort } = useSortTable(
    projects,
    "name",
    searchableKeys,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
