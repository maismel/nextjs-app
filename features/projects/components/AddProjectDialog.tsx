"use client";

import { CvsTableToolbar } from "@/features/shared/ui/CvsTableToolbar";
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
import { useProjectActions } from "@/features/projects/hooks/useProjectActions";
import { ProjectForm } from "@/features/projects/components/ProjectForm";
import { columnNames } from "@/features/projects/pages/CvProjectsPage";
import { useAvailableProjects } from "@/features/projects/hooks/useAvailableProjects";

interface CvProjectsPageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddProjectDialog = ({
  open,
  onOpenChange,
}: CvProjectsPageProps) => {
  const { cvId } = useParams<{ cvId: string }>();
  const { handleAddCvProject } = useProjectActions();
  const availableProjects = useAvailableProjects(cvId);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const selectedProjectData = availableProjects.find(
    (p) => p.id === selectedProjectId,
  );

  const { processedData, search, setSearch, handleSort } = useSortTable(
    availableProjects,
    "name",
    ["name", "domain"],
  );

  const normalizedProjects = processedData.map((p) => ({
    ...p,
    end_date: p.end_date ?? undefined,
  }));

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedProjectId("");
        }
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="lg:max-w-4xl h-[80vh] flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedProjectId ? "Add Project Details" : "Add Project"}
          </DialogTitle>
        </DialogHeader>
        {!selectedProjectId ? (
          <>
            <CvsTableToolbar value={search} onChange={setSearch} />
            <AllProjectsTable
              data={normalizedProjects}
              columnNames={columnNames}
              handleSort={handleSort}
              onAdd={setSelectedProjectId}
            />
          </>
        ) : (
          <ProjectForm
            onCancel={() => setSelectedProjectId("")}
            onSubmit={(values) => {
              handleAddCvProject({
                cvId,
                projectId: selectedProjectId,
                ...values,
              });
              onOpenChange(false);
              setSelectedProjectId("");
            }}
            projectData={selectedProjectData}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
