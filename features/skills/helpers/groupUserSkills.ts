// utils/groupUserSkills.ts
import { SkillMastery } from "cv-graphql";

export interface FullSkill {
  id: string;
  name: string;
  category_name?: string;
  category_parent_name?: string;
}

export interface UserSkillFull extends SkillMastery, FullSkill {}

export const groupUserSkills = (
  allSkills: FullSkill[],
  userSkills: SkillMastery[],
) => {
  const grouped: Record<string, UserSkillFull[]> = {};

  userSkills.forEach((skill) => {
    const fullSkill = allSkills.find((s) => s.id === skill.categoryId);
    if (!fullSkill) return;

    const category =
      fullSkill.category_parent_name || fullSkill.category_name || "Other";

    if (!grouped[category]) grouped[category] = [];

    grouped[category].push({ ...skill, ...fullSkill });
  });

  return grouped;
};
