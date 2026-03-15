import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Project } from "cv-graphql";

interface GetProjectsQuery {
  projects: Omit<Project, "internal_name">[];
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
      environment
    }
  }
`;

export const useGetProjects = () => {
    return useQuery<GetProjectsQuery>(GET_PROJECTS)
}
