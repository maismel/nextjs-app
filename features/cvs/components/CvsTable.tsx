import React from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ArrowDownUpIcon } from "lucide-react";

interface CvsTableProps {
  columnNames: {
    label: string;
    key: "name" | "education" | "email";
    sortable: boolean;
  }[];
  data: {
    email: string;
    name: string;
    education?: string | null;
    description: string;
  }[];
  handleSort: (key: "name" | "education" | "email") => void;
}

export const CvsTable = ({ columnNames, data, handleSort }: CvsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columnNames.map((col) => (
            <TableHead key={col.label}>
              <div className="flex gap-2 items-center">
                {col.label}
                {col.sortable && col.key && (
                  <button onClick={() => handleSort(col.key)}>
                    <ArrowDownUpIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((cv, index) => (
          <React.Fragment key={index}>
            <TableRow className="border-none">
              <TableCell>{cv.name}</TableCell>
              <TableCell>{cv.education}</TableCell>
              <TableCell>{cv.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-muted-foreground py-0 pb-5"
              >
                {cv.description}
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};
