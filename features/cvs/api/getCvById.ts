import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

interface GetCvResp {
  cv: {
    id: string;
    name: string;
    education: string;
    description: string;
  };
}

interface GetCvArgs {
  cvId: string;
}

const GET_CV = gql`
  query GetCv($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
    }
  }
`;

export const useGetCvById = (cvId: string) => {
  return useQuery<GetCvResp, GetCvArgs>(GET_CV, {
    variables: { cvId },
    skip: !cvId,
  });
};
