// src/features/users/api/getUsers.ts
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export interface User {
  id: string;
  email: string;
  profile?: {
    first_name?: string | null;
    last_name?: string | null;
    avatar?: string | null;
  } | null;
  department_name?: string | null;
  position_name?: string | null;
}

export interface GetUsersQuery {
  users: User[];
}

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
      department_name
      position_name
    }
  }
`;

export const useGetUsers = () => useQuery<GetUsersQuery>(GET_USERS);
