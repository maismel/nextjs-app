"use client";

import { useGetCvs } from "@/features/cvs/api/getCvs";
import { CvsTable } from "@/features/cvs/components/CvsTable";
import { CvsTableToolbar } from "@/features/cvs/components/CvsTableToolbar";
import { useSortTable } from "@/features/cvs/hooks/useSortTable";
import { useState } from "react";
import { CreateCvDialog } from "@/features/cvs/components/CreateCvDialog";
import { useCvsActions } from "@/features/cvs/hooks/useCvsActions";
import { useRouter } from "next/navigation";

export type columnOptions = "name" | "education" | "email";

const columnNames: {
  label: string;
  key: columnOptions;
  sortable: boolean;
}[] = [
  { label: "Name", key: "name", sortable: true },
  { label: "Education", key: "education", sortable: false },
  { label: "Employee", key: "email", sortable: true },
];

export const CvsList = () => {
  const { data } = useGetCvs();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const router = useRouter();

  const transformed =
    data?.cvs.map(({ user, ...rest }) => ({
      ...rest,
      email: user?.email ?? "",
    })) ?? [];

  const searchableKeys = [
    "name",
    "description",
  ] satisfies (keyof (typeof transformed)[number])[];

  const { processedData, search, setSearch, handleSort } = useSortTable(
    transformed,
    "name",
    searchableKeys,
  );

  const openModal = () => {
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (id: string) => {
    router.push(`cvs/${id}/details`)
    
  };

  const { handleCreateCv, handleDelete } = useCvsActions();

  return (
    <>
      <CvsTableToolbar
        value={search}
        onChange={setSearch}
        onButtonClick={openModal}
        buttonText="CREATE CV"
      />
      <CvsTable
        columnNames={columnNames}
        data={processedData}
        handleSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CreateCvDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateCv}
      />
    </>
  );
};
