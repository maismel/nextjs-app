import { SkillMastery } from "cv-graphql";
import { SkillBar } from "@/features/skills/components/SkillBar";
import { Checkbox } from "@/components/ui/checkbox";

interface UserSkillsProps {
  groupedSkills: Record<string, SkillMastery[]>;
  selectedSkills: string[];
  toggleSkillSelection: (name: string, checked: boolean) => void;
  onSkillClick: (skill: { categoryId: string; mastery: string }) => void;
}

export const UserSkills = ({
  groupedSkills,
  selectedSkills,
  toggleSkillSelection,
  onSkillClick,
}: UserSkillsProps) => {
  return (
    <div className="flex flex-col gap-10">
      {Object.entries(groupedSkills).map(([category, skills]) => (
        <div key={category} className="flex flex-col gap-4">
          <p className="text-lg">{category}</p>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill) => (
              <div
                key={`${skill.categoryId}-${skill.name}`}
                className="px-3 py-1 rounded-full text-sm flex items-center gap-2 cursor-pointer"
                onClick={() =>
                  onSkillClick({
                    categoryId: skill.categoryId ?? "",
                    mastery: skill.mastery,
                  })
                }
              >
                <Checkbox
                  checked={selectedSkills.includes(skill.name)}
                  onCheckedChange={(checked) =>
                    toggleSkillSelection(skill.name, Boolean(checked))
                  }
                  onClick={(e) => e.stopPropagation()}
                />
                <SkillBar mastery={skill.mastery} />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
