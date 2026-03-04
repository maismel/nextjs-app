import { FullSkill } from "@/features/skills/helpers/groupUserSkills";
import { SkillMastery } from "cv-graphql";

export const filterAvailableSkills = (
  allSkills: FullSkill[],
  userSkills: SkillMastery[],
) => {
  const usedCategoryIds = new Set(userSkills.map((s) => s.categoryId));
  return allSkills.filter((skill) => !usedCategoryIds.has(skill.id));
};
