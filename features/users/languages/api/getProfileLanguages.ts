import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export type ProfileLanguage = {
  name: string;
  proficiency: string;
};

export type GetProfileLanguagesData = {
  profile: {
    id: string;
    languages: ProfileLanguage[];
  };
};

export const GET_PROFILE_LANGUAGES = gql`
  query GetProfileLanguages($userId: ID!) {
    profile(userId: $userId) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export const useGetProfileLanguages = (userId: string) => {
  return useQuery<GetProfileLanguagesData>(GET_PROFILE_LANGUAGES, {
    variables: { userId },
    skip: !userId,
  });
};
