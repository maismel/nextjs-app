"use client";

import { useSortTable } from "@/hooks/useSortTable";
import { useGetLanguages } from "@/features/languages/api/getLanguages";
import { LanguagesTable } from "@/features/languages/components/LanguagesTable";
import { CvsTableToolbar } from "@/features/shared/ui/CvsTableToolbar";

export type columnOptions = "name" | "native_name" | "iso2";

export const columnNames: {
  label: string;
  key: columnOptions;
  sortable: boolean;
}[] = [
  { label: "Name", key: "name", sortable: true },
  { label: "Native name", key: "native_name", sortable: false },
  { label: "Iso2", key: "iso2", sortable: false },
];

export const LanguagesPage = () => {
  const { data } = useGetLanguages();
  const allLanguages = data?.languages || [];

  const { processedData, search, setSearch, handleSort } = useSortTable(
    allLanguages,
    "name",
    ["name"],
  );

  return (
    <>
      <CvsTableToolbar value={search} onChange={setSearch} />
      <LanguagesTable
        columnNames={columnNames}
        data={processedData}
        handleSort={handleSort}
      />
    </>
  );
};
