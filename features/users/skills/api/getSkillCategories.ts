import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export type SkillCategory = {
  id: string;
  name: string;
};

type GetSkillCategoriesData = {
  skillCategories: SkillCategory[];
};

export const GET_SKILL_CATEGORIES = gql`
  query GetSkillCategories {
    skillCategories {
      id
      name
    }
  }
`;

export const useGetSkillCategories = () => {
  return useQuery<GetSkillCategoriesData>(GET_SKILL_CATEGORIES);
};
