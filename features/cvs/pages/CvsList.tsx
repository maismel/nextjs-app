"use client";

import { useGetCvs } from "@/features/cvs/api/getCvs";
import { CvsTable } from "@/features/cvs/components/CvsTable";
import { CvsTableToolbar } from "@/features/shared/ui/CvsTableToolbar";
import { useSortTable } from "@/hooks/useSortTable";
import { useState } from "react";
import { CreateCvDialog } from "@/features/cvs/components/CreateCvDialog";
import { useCvsActions } from "@/features/cvs/hooks/useCvsActions";
import { useRouter } from "next/navigation";
import { DeleteCvDialog } from "@/features/cvs/components/DeleteCvDialog";
import { Preloader } from "@/components/ui/Preloader";

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
  const { data, loading } = useGetCvs();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cvToDelete, setCvToDelete] = useState("");
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

  const openCreateModal = () => {
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (id: string) => {
    router.push(`cvs/${id}/details`);
  };

  const openDeleteModal = (id: string) => {
    setCvToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const { handleDelete } = useCvsActions();

  return (
    <>
      {loading && <Preloader />}
      <CvsTableToolbar
        value={search}
        onChange={setSearch}
        onButtonClick={openCreateModal}
        buttonText="CREATE CV"
      />
      <CvsTable
        columnNames={columnNames}
        data={processedData}
        handleSort={handleSort}
        onEdit={handleEdit}
        onDelete={openDeleteModal}
      />
      <CreateCvDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
      <DeleteCvDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => handleDelete(cvToDelete)}
      />
    </>
  );
};
