import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Mastery } from "cv-graphql";

interface GetCvPreviewArgs {
  cvId: string;
}

export interface GetCvPreviewResponse {
  cv: {
    id: string;
    name: string;
    education: string;
    description: string;

    skills: {
      name: string;
      categoryId?: string;
      mastery: Mastery;
    }[];

    projects: {
      name: string;
      description: string;
      roles: string[];
      start_date: string;
      end_date?: string;
      responsibilities: string[];
      environment: string[];
    }[];

    user: {
      id: string;
      position_name: string;
      profile: {
        full_name?: string;
      };
    };
  };
}

const GET_CV_PREVIEW = gql`
  query GetCvPreview($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      skills {
        name
        categoryId
        mastery
      }
      projects {
        name
        description
        roles
        start_date
        end_date
        responsibilities
        environment
      }
      user {
        id
        position_name
        profile {
          full_name
        }
      }
    }
  }
`;

export const useGetCvPreview = (cvId: string) => {
  return useQuery<GetCvPreviewResponse, GetCvPreviewArgs>(GET_CV_PREVIEW, {
    variables: {
      cvId,
    },
  });
};
