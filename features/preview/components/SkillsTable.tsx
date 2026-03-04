import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserSkillFull } from "@/features/skills/helpers/groupUserSkills";

interface SkillsTableProps {
  groupedSkills: Record<string, UserSkillFull[]>;
}

export const SkillsTable = ({ groupedSkills }: SkillsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-destructive">
          <TableHead>Category</TableHead>
          <TableHead>Skill</TableHead>
          <TableHead>Mastery</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Object.entries(groupedSkills).map(([category, skills]) =>
          skills.map((skill, index) => {
            return (
              <TableRow key={skill.id}>
                {index === 0 && (
                  <TableCell
                    rowSpan={skills.length}
                    className="font-semibold text-destructive"
                  >
                    {category}
                  </TableCell>
                )}

                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.mastery}</TableCell>
              </TableRow>
            );
          }),
        )}
      </TableBody>
    </Table>
  );
};
