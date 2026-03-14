"use client";

import { useGetSkills } from "@/features/skills/api/getSkills";
import { CvsTableToolbar } from "@/features/shared/ui/CvsTableToolbar";
import { useSortTable } from "@/hooks/useSortTable";
import { SkillsTable } from "@/features/skills/components/SkillsTable";
import { Preloader } from "@/components/ui/Preloader";

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
  const { data, loading } = useGetSkills();
  const allSkills = data?.skills || [];

  const { processedData, search, setSearch, handleSort } = useSortTable(
    allSkills,
    "name",
    ["name"],
  );

  return (
    <>
      <Preloader loading={loading} />
      <CvsTableToolbar value={search} onChange={setSearch} />
      <SkillsTable
        columnNames={columnNames}
        data={processedData}
        handleSort={handleSort}
      />
    </>
  );
};
