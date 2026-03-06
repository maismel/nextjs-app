import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownUpIcon, ChevronRight } from "lucide-react";
import type { SortOrder } from "@/features/cvs/hooks/useSortTable";
import type { UserRow } from "@/features/users/types/userRow";
import Image from "next/image";

type SortKey = keyof Pick<
  UserRow,
  "firstName" | "lastName" | "email" | "department" | "position"
>;

const columns: { label: string; key: SortKey; sortable: boolean }[] = [
  { label: "First Name", key: "firstName", sortable: true },
  { label: "Last Name", key: "lastName", sortable: true },
  { label: "Email", key: "email", sortable: true },
  { label: "Department", key: "department", sortable: true },
  { label: "Position", key: "position", sortable: true },
];

interface UsersTableProps {
  rows: UserRow[];
  sortBy: keyof UserRow;
  sortOrder: SortOrder; // asc desc
  onSort: (key: keyof UserRow) => void;
  onRowClick?: (userId: string) => void;
}
const go = (userId: string, onRowClick?: (userId: string) => void) => {
  onRowClick?.(userId);
};

export const UsersTable = ({
  rows,
  sortBy,
  sortOrder,
  onSort,
  onRowClick,
}: UsersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[56px]">Avatar</TableHead>

          {columns.map((column) => (
            <TableHead key={column.key}>
              <div className="flex items-center gap-2">
                <span>{column.label}</span>

                {column.sortable && (
                  <button
                    type="button"
                    onClick={() => onSort(column.key)}
                    className="inline-flex items-center"
                    aria-label={`Sort by ${column.label}`}
                    title={
                      sortBy === column.key
                        ? `Sorted ${sortOrder}`
                        : `Sort by ${column.label}`
                    }
                  >
                    <ArrowDownUpIcon className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </TableHead>
          ))}

          <TableHead className="w-[40px]" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((user) => (
          <TableRow key={user.id} className="group">
            <TableCell>
              {user.avatar ? (
                <Image
                  width={32}
                  height={32}
                  src={user.avatar}
                  alt={user.fullName || user.email}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                  {(user.email?.charAt(0) ?? "?").toUpperCase()}
                </div>
              )}
            </TableCell>

            <TableCell
              className="cursor-pointer"
              onClick={() => go(user.id, onRowClick)}
            >
              {user.firstName || "-"}
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => go(user.id, onRowClick)}
            >
              {user.lastName || "-"}
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => go(user.id, onRowClick)}
            >
              {user.email || "-"}
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => go(user.id, onRowClick)}
            >
              {user.department || "-"}
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => go(user.id, onRowClick)}
            >
              {user.position || "-"}
            </TableCell>

            <TableCell className="text-right text-muted-foreground">
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
