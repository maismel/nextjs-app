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
import { RowActions } from "@/features/shared/components/RowActions";
import { columnOptions } from "@/features/skills/pages/SkillsPage";

interface SkillsTableProps {
  columnNames: {
    label: string;
    key: columnOptions;
    sortable: boolean;
  }[];
  data: {
    id: string;
    name: string;
    category_name: string;
  }[];
  handleSort: (key: columnOptions) => void;
}

export const SkillsTable = ({
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
        {data.map((skill) => (
          <React.Fragment key={skill.id}>
            <TableRow className="border-none">
              <TableCell>{skill.name}</TableCell>
              <TableCell>{skill.category_name}</TableCell>
              <TableCell className="text-right">
                <RowActions id={skill.id} actions={[]} />
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};
