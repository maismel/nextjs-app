import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

interface GetProjectsQuery {
  cv: {
    projects: {
      id: string;
      name: string;
      domain: string;
      start_date: string;
      end_date?: string;
      description: string;
      roles: string[];
    }[];
  };
}

interface GetProjectArgs {
  cvId: string;
}

const GET_USER_PROJECTS = gql`
  query GetUserProjects($cvId: ID!) {
    cv(cvId: $cvId) {
      projects {
        id
        name
        domain
        start_date
        end_date
        description
        roles
      }
    }
  }
`;

export const useGetUserProjects = (cvId: string) => {
  return useQuery<GetProjectsQuery, GetProjectArgs>(GET_USER_PROJECTS, {
    variables: {
      cvId,
    },
    skip: !cvId
  });
};
