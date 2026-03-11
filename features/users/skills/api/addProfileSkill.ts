import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const ADD_PROFILE_SKILL = gql`
  mutation AddProfileSkill(
    $userId: ID!
    $name: String!
    $categoryId: ID
    $mastery: Mastery!
  ) {
    addProfileSkill(
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

export const useAddProfileSkill = () => useMutation(ADD_PROFILE_SKILL);
