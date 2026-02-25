import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { UpdateCvInput, Cv } from "cv-graphql";

interface UpdateCvArgs {
  cv: UpdateCvInput;
}

interface UpdateCvResponse {
  updateCv: Cv;
}

const UPDATE_CV = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
    }
  }
`;
export const useUpdateCv = () => {
  return useMutation<UpdateCvResponse, UpdateCvArgs>(UPDATE_CV);
};
