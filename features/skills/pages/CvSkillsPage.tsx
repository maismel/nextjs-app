"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetSkills } from "@/features/skills/api/getSkills";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { SkillDialog } from "@/features/skills/components/SkillDialog";
import { useSkillActions } from "@/features/skills/hooks/useSkillActions";
import { useGetUserSkills } from "@/features/skills/api/getUserSkills";
import { UserSkills } from "@/features/skills/components/UserSkills";
import { groupUserSkills } from "@/features/skills/helpers/groupUserSkills";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/features/shared/components/ConfirmDialog";

export interface SkillFormValues {
  categoryId: string;
  mastery: string;
}

export const CvSkillsPage = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const { data: allSkills } = useGetSkills();
  const { data: userSkills } = useGetUserSkills(cvId);
  const { handleAddCvSkill, handleUpdateCvSkill, handleRemoveCvSkill } =
    useSkillActions();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    mode: "add" | "edit";
    initialValues?: SkillFormValues;
  }>({
    open: false,
    mode: "add",
  });

  const allSkillsList = allSkills?.skills ?? [];
  const userSkillsList = userSkills?.cv.skills ?? [];

  const groupedUserSkills = groupUserSkills(allSkillsList, userSkillsList);

  const openAddDialog = () => {
    setDialogState({
      open: true,
      mode: "add",
    });
  };

  const openEditDialog = (skill: SkillFormValues) => {
    setDialogState({
      open: true,
      mode: "edit",
      initialValues: skill,
    });
  };

  const toggleSkillSelection = (skillName: string, checked: boolean) => {
    setSelectedSkills((prev) =>
      checked
        ? [...prev, skillName]
        : prev.filter((name) => name !== skillName),
    );
  };

  return (
    <>
      <UserSkills
        groupedSkills={groupedUserSkills}
        selectedSkills={selectedSkills}
        toggleSkillSelection={toggleSkillSelection}
        onSkillClick={(skill) => {
          openEditDialog(skill);
        }}
      />
      <div className="w-full flex gap-12 justify-end">
        <Button
          variant="ghost"
          size="lg"
          className="flex gap-2 items-center text-muted-foreground"
          onClick={openAddDialog}
        >
          <PlusIcon />
          ADD SKILL
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="flex gap-2 items-center text-destructive"
          disabled={selectedSkills.length === 0}
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2Icon />
          REMOVE SKILLS
        </Button>
      </div>
      <SkillDialog
        open={dialogState.open}
        onOpenChange={(open) => setDialogState((prev) => ({ ...prev, open }))}
        mode={dialogState.mode}
        initialValues={dialogState.initialValues}
        onSubmit={
          dialogState.mode === "add" ? handleAddCvSkill : handleUpdateCvSkill
        }
      />
      <ConfirmDialog
        title="Delete Skills"
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => {
          handleRemoveCvSkill({
            cvId,
            name: selectedSkills,
          });
          setSelectedSkills([]);
        }}
      />
    </>
  );
};
