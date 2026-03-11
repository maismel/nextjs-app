import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const ADD_PROFILE_LANGUAGE = gql`
  mutation AddProfileLanguage(
    $userId: ID!
    $name: String!
    $proficiency: Proficiency!
  ) {
    addProfileLanguage(
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

export const useAddProfileLanguage = () => useMutation(ADD_PROFILE_LANGUAGE);
