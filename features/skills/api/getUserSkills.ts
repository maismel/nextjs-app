import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { SkillMastery } from "cv-graphql";

interface getSkillsResp {
  cv: {
    skills: SkillMastery[];
  };
}

interface GetSkillsArgs {
  cvId: string;
}

const GET_USER_SKILLS = gql`
  query GetUserSkills($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const useGetUserSkills = (cvId: string) => {
  return useQuery<getSkillsResp, GetSkillsArgs>(GET_USER_SKILLS, {
    variables: {
      cvId,
    },
  });
};
