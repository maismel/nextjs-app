import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export type ProfileSkill = {
  name: string;
  categoryId?: string | null;
  mastery: string;
};

type GetProfileSkillsData = {
  profile: {
    id: string;
    skills: ProfileSkill[];
  };
};

type GetProfileSkillsVars = {
  userId: string;
};

export const GET_PROFILE_SKILLS = gql`
  query GetProfileSkills($userId: ID!) {
    profile(userId: $userId) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const useGetProfileSkills = (userId: string) => {
  return useQuery<GetProfileSkillsData, GetProfileSkillsVars>(
    GET_PROFILE_SKILLS,
    {
      variables: { userId },
    },
  );
};
