import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { DeleteCvInput } from "cv-graphql";


interface DeleteCvResponse {
  deleteCv: {
    affected: number;
  };
}

interface DeleteCvVariables {
  cv: DeleteCvInput;
}

export const DELETE_CV = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;

export const useDeleteCv = () => {
  return useMutation<DeleteCvResponse, DeleteCvVariables>(DELETE_CV);
};
