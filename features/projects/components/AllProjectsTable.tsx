import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RowActions } from "@/features/shared/components/RowActions";
import { columnOptions } from "@/features/projects/pages/CvProjectsPage";
import { ArrowDownUpIcon } from "lucide-react";
import React from "react";

interface ProjectsTableProps {
  columnNames: {
    label: string;
    key: columnOptions;
    sortable: boolean;
  }[];
  data: {
    id: string;
    name: string;
    domain: string;
    start_date: string;
    description: string;
    end_date?: string;
    roles?: string[];
  }[];
  handleSort: (key: columnOptions) => void;
  onAdd?: (id: string) => void;
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const AllProjectsTable = ({
  columnNames,
  data,
  handleSort,
  onAdd,
  onUpdate,
  onDelete,
}: ProjectsTableProps) => {
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
        {data.map((project) => (
          <React.Fragment key={project.id}>
            <TableRow className="border-none">
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.domain}</TableCell>
              <TableCell>{project.start_date}</TableCell>
              <TableCell>{project.end_date ?? "Till now"} </TableCell>
              <TableCell className="text-right">
                <RowActions
                  id={project.id}
                  actions={[
                    ...(onAdd
                      ? [
                          {
                            label: "Add to my CV",
                            onClick: onAdd,
                          },
                        ]
                      : []),
                    ...(onUpdate
                      ? [
                          {
                            label: "Update CV",
                            onClick: onUpdate,
                          },
                        ]
                      : []),
                    ...(onDelete
                      ? [
                          {
                            label: "Remove CV",
                            onClick: onDelete,
                          },
                        ]
                      : []),
                  ]}
                />
              </TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell
                colSpan={4}
                className="text-muted-foreground py-0 pb-5"
              >
                {project.description}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className="py-0 pb-5 flex gap-4">
                {project.roles?.map((role, index) => (
                  <p
                    key={`${role}-${index}`}
                    className="bg-gray-200 px-2 py-1 rounded-full"
                  >
                    {role}
                  </p>
                ))}
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};
