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
import { RowActions } from "@/features/cvs/components/RowActions";
import { columnOptions } from "@/features/languages/pages/LanguagesPage";
import { Language } from "cv-graphql";

export interface SkillsTableProps {
  columnNames: {
    label: string;
    key: columnOptions;
    sortable: boolean;
  }[];
  data: Omit<Language, "created_at">[];
  handleSort: (key: columnOptions) => void;
}

export const LanguagesTable = ({
  columnNames,
  data,
  handleSort,
}: SkillsTableProps) => {
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
        {data.map((lang) => (
          <React.Fragment key={lang.id}>
            <TableRow className="border-none">
              <TableCell>{lang.name}</TableCell>
              <TableCell>{lang.native_name ?? "-"}</TableCell>
              <TableCell>{lang.iso2}</TableCell>
              <TableCell className="text-right">
                <RowActions id={lang.id} actions={[]} />
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};
