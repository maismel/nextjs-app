import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { UpdateCvProjectInput } from "cv-graphql";

interface updateCvProjectArgs {
  project: UpdateCvProjectInput;
}

interface updateCvProjectResp {
  cv: {
    id: string;
  };
}

const UPDATE_CV_PROJECT = gql`
  mutation UpdateCvProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
      id
    }
  }
`;

export const useUpdateCvProject = () => {
  return useMutation<updateCvProjectResp, updateCvProjectArgs>(
    UPDATE_CV_PROJECT,
  );
};
