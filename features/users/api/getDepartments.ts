import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export type Department = { id: string; name: string };
export type GetDepartmentsData = { departments: Department[] };

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
    }
  }
`;

export const useGetDepartments = () =>
  useQuery<GetDepartmentsData>(GET_DEPARTMENTS);
