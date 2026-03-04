import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { UpdateCvSkillInput } from "cv-graphql";

interface updateCvSkillArgs {
  skill: UpdateCvSkillInput;
}

interface updateCvSkillResp {
  updateCvSkill: {
    id: string;
  };
}

const UPDATE_CV_SKILL = gql`
  mutation ($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
    }
  }
`;

export const useUpdateCvSkill = () => {
  return useMutation<updateCvSkillResp, updateCvSkillArgs>(UPDATE_CV_SKILL);
};
