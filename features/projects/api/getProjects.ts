import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

interface GetProjectsQuery {
  projects: {
    id: string;
    name: string;
    domain: string;
    start_date: string;
    end_date?: string;
    description: string;
  }[];
}

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      domain
      start_date
      end_date
      description
    }
  }
`;

export const useGetProjects = () => {
    return useQuery<GetProjectsQuery>(GET_PROJECTS)
}
