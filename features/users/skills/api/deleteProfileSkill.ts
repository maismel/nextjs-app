import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const DELETE_PROFILE_SKILL = gql`
  mutation DeleteProfileSkill($userId: ID!, $name: [String!]!) {
    deleteProfileSkill(skill: { userId: $userId, name: $name }) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const useDeleteProfileSkill = () => useMutation(DELETE_PROFILE_SKILL);
