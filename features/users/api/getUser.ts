import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export type GetUserVars = {
  userId: string;
};

export type GetUserData = {
  user: {
    id: string;
    email: string;
    role: string;
    department_name?: string | null;
    position_name?: string | null;
    department?: { id: string; name: string } | null;
    position?: { id: string; name: string } | null;
    created_at: string;
    profile?: {
      id: string;
      first_name?: string | null;
      last_name?: string | null;
      full_name?: string | null;
      avatar?: string | null;
    } | null;
  };
};

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      id
      email
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
      profile {
        id
        first_name
        last_name
        full_name
        avatar
      }
      created_at
    }
  }
`;

export const useGetUser = (userId: string) => {
  return useQuery<GetUserData, GetUserVars>(GET_USER, {
    variables: { userId },
  });
};
