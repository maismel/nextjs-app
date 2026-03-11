import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export type Skill = {
  id: string;
  name: string;
  category?: {
    id: string;
    name: string;
  } | null;
  category_name?: string | null;
  category_parent_name?: string | null;
};

type GetSkillsData = {
  skills: Skill[];
};

export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
      category {
        id
        name
      }
      category_name
      category_parent_name
    }
  }
`;

export const useGetSkills = () => {
  return useQuery<GetSkillsData>(GET_SKILLS);
};
