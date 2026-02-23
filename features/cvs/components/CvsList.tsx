"use client";

import { useGetCvs } from "@/features/cvs/api/getCvs";
import { CvsTable } from "@/features/cvs/components/CvsTable";
import { CvsTableToolbar } from "@/features/cvs/components/CvsTableToolbar";
import { useSortTable } from "@/features/cvs/hooks/useSortTable";

type sortOptions = "name" | "education" | "email";

const columnNames: {
  label: string;
  key: sortOptions;
  sortable: boolean;
}[] = [
  { label: "Name", key: "name", sortable: true },
  { label: "Education", key: "education", sortable: false },
  { label: "Employee", key: "email", sortable: true },
];

export const CvsList = () => {
  const { data } = useGetCvs();
  const transformed =
    data?.cvs.map(({ user, ...rest }) => ({
      ...rest,
      email: user?.email ?? "",
    })) ?? [];
  const { processedData, search, setSearch, handleSort } = useSortTable(
    transformed,
    "name",
  );

  console.log("CVS FROM SERVER", data);
  return (
    <>
      <CvsTableToolbar value={search} onChange={setSearch} />
      <CvsTable
        columnNames={columnNames}
        data={processedData}
        handleSort={handleSort}
      />
    </>
  );
};
