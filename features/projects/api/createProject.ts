import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { CreateProjectInput, Project } from "cv-graphql";

export type createProjectArgs = {
  project: CreateProjectInput;
};

export type createProjectResult = {
  createProject: Project;
};

const CREATE_PROJECT = gql`
  mutation CreateProject($project: CreateProjectInput!) {
    createProject(project: $project) {
      id
      name
    }
  }
`;

export const useCreateProject = () => {
  return useMutation<createProjectResult, createProjectArgs>(CREATE_PROJECT);
};
