import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const DELETE_PROFILE_LANGUAGE = gql`
  mutation DeleteProfileLanguage($userId: ID!, $name: [String!]!) {
    deleteProfileLanguage(language: { userId: $userId, name: $name }) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export const useDeleteProfileLanguage = () =>
  useMutation(DELETE_PROFILE_LANGUAGE);
