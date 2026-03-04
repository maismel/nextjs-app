import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { DeleteCvSkillInput } from "cv-graphql";

interface deleteCvSkillArgs {
  skill: DeleteCvSkillInput;
}

interface deleteCvSkillResp {
  cv: {
    id: string
  }
}

const DELETE_CV_SKILL = gql`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
        id
    }
  }
`;

export const useDeleteCvSkill = () => {
    return useMutation < deleteCvSkillResp, deleteCvSkillArgs>(DELETE_CV_SKILL)
}
