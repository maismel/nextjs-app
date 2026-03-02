import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { AddCvProjectInput, Project } from "cv-graphql";

export type addProjectArgs = {
  project: AddCvProjectInput;
};

export type addProjectResult = {
  createProject: Project;
};

const ADD_PROJECT = gql`
  mutation addCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
      name
    }
  }
`;

export const useAddCvProject = () => {
  return useMutation<addProjectResult, addProjectArgs>(ADD_PROJECT);
};
