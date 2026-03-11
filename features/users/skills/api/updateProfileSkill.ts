import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const UPDATE_PROFILE_SKILL = gql`
  mutation UpdateProfileSkill(
    $userId: ID!
    $name: String!
    $categoryId: ID
    $mastery: Mastery!
  ) {
    updateProfileSkill(
      skill: {
        userId: $userId
        name: $name
        categoryId: $categoryId
        mastery: $mastery
      }
    ) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const useUpdateProfileSkill = () => useMutation(UPDATE_PROFILE_SKILL);
