import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

interface GetCvsQuery {
  cvs: {
    id: string;
    name: string;
    education?: string | null;
    description: string;
    user?: {
      email: string;
    } | null;
  }[];
}

const GET_CVS = gql`
  query GetCvs {
    cvs {
      id
      name
      education
      description
      user {
        email
      }
    }
  }
`;

export const useGetCvs = () => {
  return useQuery<GetCvsQuery>(GET_CVS);
};
