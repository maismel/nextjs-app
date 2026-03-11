import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const UPDATE_PROFILE_LANGUAGE = gql`
  mutation UpdateProfileLanguage(
    $userId: ID!
    $name: String!
    $proficiency: Proficiency!
  ) {
    updateProfileLanguage(
      language: { userId: $userId, name: $name, proficiency: $proficiency }
    ) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export const useUpdateProfileLanguage = () =>
  useMutation(UPDATE_PROFILE_LANGUAGE);
