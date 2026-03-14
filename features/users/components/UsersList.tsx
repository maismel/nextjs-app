"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useGetUsers } from "../api/getUsers";
import { useSortTable } from "@/hooks/useSortTable";
import type { UserRow } from "@/features/users/types/userRow";
import { CvsTableToolbar } from "@/features/shared/ui/CvsTableToolbar";
import { UsersTable } from "@/features/users/components/UsersTable";
import { Preloader } from "@/components/ui/Preloader";

export const UsersList = () => {
  const router = useRouter();
  const { data, loading, error } = useGetUsers();

  const rows: UserRow[] = useMemo(() => {
    return (
      data?.users.map((user) => {
        const firstName = user.profile?.first_name ?? "";
        const lastName = user.profile?.last_name ?? "";
        const fullName = `${firstName} ${lastName}`.trim();

        return {
          id: user.id,
          avatar: user.profile?.avatar ?? null,
          firstName,
          lastName,
          fullName,
          email: user.email ?? "",
          department: user.department_name ?? "",
          position: user.position_name ?? "",
        };
      }) ?? []
    );
  }, [data]);

  const { processedData, search, setSearch, sortBy, sortOrder, handleSort } =
    useSortTable(rows, "firstName", ["fullName"]);

  if (error)
    return <div className="py-6 text-destructive">{error.message}</div>;

  return (
    <>
      <Preloader loading={loading} />
      <CvsTableToolbar value={search} onChange={setSearch} />
      <div className="mt-4">
        <UsersTable
          rows={processedData}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          onRowClick={(id) => router.push(`/users/${id}/profile`)}
        />
      </div>
    </>
  );
};
