import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

interface getSkillsResp {
  skills:
   {
    id: string;
    name: string;
    category: string;
    category_name: string;
    category_parent_name: string;
  }[];
}

const GET_SKILLS = gql`
  query getSkills {
    skills {
      id
      name
      category {
        name
      }
      category_name
      category_parent_name
    }
  }
`;

export const useGetSkills = () => {
    return useQuery<getSkillsResp>(GET_SKILLS);
}
