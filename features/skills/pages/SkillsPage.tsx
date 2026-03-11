"use client";

import { useGetSkills } from "@/features/skills/api/getSkills";
import { CvsTableToolbar } from "@/features/shared/ui/CvsTableToolbar";
import { useSortTable } from "@/hooks/useSortTable";
import { SkillsTable } from "@/features/skills/components/SkillsTable";

export type columnOptions = "name" | "category_name";

const columnNames: {
  label: string;
  key: columnOptions;
  sortable: boolean;
}[] = [
  { label: "Name", key: "name", sortable: true },
  { label: "Category", key: "category_name", sortable: true },
];

export const SkillsPage = () => {
  const { data } = useGetSkills();
  const allSkills = data?.skills || [];

  const searchableKeys = ["name"] satisfies columnOptions[];

  const { processedData, search, setSearch, handleSort } = useSortTable(
    allSkills,
    "name",
    searchableKeys,
  );

  return (
    <>
      <CvsTableToolbar value={search} onChange={setSearch} />
      <SkillsTable
        columnNames={columnNames}
        data={processedData}
        handleSort={handleSort}
      />
    </>
  );
};
