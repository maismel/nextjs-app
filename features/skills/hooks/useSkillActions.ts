import { useAddCvSkill } from "@/features/skills/api/addCvSkill";
import { useDeleteCvSkill } from "@/features/skills/api/deleteCvSkill";
import { useUpdateCvSkill } from "@/features/skills/api/updateCvSkill";
import { AddCvSkillInput, DeleteCvSkillInput, UpdateCvSkillInput } from "cv-graphql";

export const useSkillActions = () => {
  const [addCvSkill] = useAddCvSkill();
  const [updateCvSkill] = useUpdateCvSkill();
  const [removeCvSkill] = useDeleteCvSkill();

  const handleAddCvSkill = async (input: AddCvSkillInput) => {
    await addCvSkill({
      variables: {
        skill: {
          ...input,
        },
      },
      refetchQueries: ["GetUserSkills"],
    });
  };

  const handleUpdateCvSkill = async (input: UpdateCvSkillInput) => {
    await updateCvSkill({
      variables: {
        skill: {
          ...input,
        },
      },
      refetchQueries: ["GetUserSkills"],
    });
  };

  const handleRemoveCvSkill = async (input: DeleteCvSkillInput) => {
    await removeCvSkill({
      variables: {
        skill: {
          ...input,
        },
      },
      refetchQueries: ["GetUserSkills"],
    });
  };

  return {
    handleAddCvSkill,
    handleUpdateCvSkill,
    handleRemoveCvSkill,
  };
};
