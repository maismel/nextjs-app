import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      role
      department_name
      position_name
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;

export const useUpdateUser = () => useMutation(UPDATE_USER);
