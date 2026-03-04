import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { AddCvSkillInput, SkillMastery } from "cv-graphql";

interface addCvSkillArgs {
  skill: AddCvSkillInput;
}

interface addCvSkillResp {
  addCvSkill: { skills: SkillMastery[] };
}

const ADD_CV_SKILL = gql`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const useAddCvSkill = () => {
  return useMutation<addCvSkillResp, addCvSkillArgs>(ADD_CV_SKILL);
};
