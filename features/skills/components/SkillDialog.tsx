import { useParams } from "next/navigation";
import { AddCvSkillInput } from "cv-graphql";
import { useGetSkills } from "@/features/skills/api/getSkills";
import { SkillsForm } from "@/features/skills/components/SkillsForm";
import { useGetUserSkills } from "@/features/skills/api/getUserSkills";
import { filterAvailableSkills } from "@/features/skills/helpers/filterAvailableSkills";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddCvSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: AddCvSkillInput) => void;
  initialValues?: {
    categoryId: string;
    mastery: string;
  };
  mode?: "add" | "edit";
}

export const SkillDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialValues,
  mode,
}: AddCvSkillDialogProps) => {
  const { cvId } = useParams<{ cvId: string }>();
  const { data: allSkills } = useGetSkills();
  const { data: userSkills } = useGetUserSkills(cvId);
  const allSkillsList = allSkills?.skills ?? [];
  const userSkillsList = userSkills?.cv.skills ?? [];

  const skillsOptions =
    mode === "add"
      ? filterAvailableSkills(allSkillsList, userSkillsList).map((skill) => ({
          id: skill.id,
          name: skill.name,
        }))
      : allSkillsList.map((skill) => ({
          id: skill.id,
          name: skill.name,
        }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Update Skill" : "Add Skill"}
          </DialogTitle>
        </DialogHeader>
        <SkillsForm
          skills={skillsOptions}
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit({
              cvId,
              ...values,
            });
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
