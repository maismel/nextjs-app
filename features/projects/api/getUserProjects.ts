import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { CvProject } from "cv-graphql";

interface GetProjectsQuery {
  cv: {
    projects: Omit<CvProject, "internal_name, project">[];
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
        environment
        roles
        responsibilities
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
