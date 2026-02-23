import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { CreateCvInput, Cv } from "cv-graphql";

export type createCvArgs = {
  cv: CreateCvInput;
};

export type createCvResult = {
  createCv: Cv;
};

export const CREATE_CV = gql`
  mutation CreateCV($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      name
      education
      description
    }
  }
`;

export const useCreateCv = () => {
  return useMutation<createCvResult, createCvArgs>(CREATE_CV);
};
