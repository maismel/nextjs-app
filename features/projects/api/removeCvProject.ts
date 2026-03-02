import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { RemoveCvProjectInput } from "cv-graphql";

interface RemoveCvProjectArgs {
  project: RemoveCvProjectInput;
}

interface RemoveCvProjectResp {
  cv: {
    id: string;
  };
}

const REMOVE_CV_PROJECT = gql`
  mutation RemoveCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      id
    }
  }
`;

export const useRemoveCvProject = () => {
  return useMutation<RemoveCvProjectResp, RemoveCvProjectArgs>(
    REMOVE_CV_PROJECT,
  );
};
