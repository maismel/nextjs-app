"use client";

import { useMemo, useState } from "react";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";

import { useGetProfileSkills, ProfileSkill } from "../api/getProfileSkills";
import { Skill, useGetSkills } from "../api/getSkills";
import {
  SkillCategory,
  useGetSkillCategories,
} from "../api/getSkillCategories";
import { useAddProfileSkill } from "../api/addProfileSkill";
import { useUpdateProfileSkill } from "../api/updateProfileSkill";
import { useDeleteProfileSkill } from "../api/deleteProfileSkill";
import { SkillDialog, SkillFormState } from "./SkillsDialog";
import { UserSkillsUI, GroupedSkill } from "./UserSkillsUI";
import { Preloader } from "@/components/ui/Preloader";

export const UserSkills = ({ userId }: { userId: string }) => {
  const currentUserId = getUserIdFromToken()?.toString() ?? null;
  const readOnly = currentUserId !== userId;

  const {
    data: profileData,
    loading: profileLoading,
    refetch,
  } = useGetProfileSkills(userId);

  const { data: skillsData, loading: skillsLoading } = useGetSkills();
  const { data: categoriesData, loading: categoriesLoading } =
    useGetSkillCategories();

  const [addSkill] = useAddProfileSkill();
  const [updateSkill] = useUpdateProfileSkill();
  const [deleteSkill] = useDeleteProfileSkill();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "update">("add");
  const [editingSkill, setEditingSkill] = useState<SkillFormState | undefined>(
    undefined,
  );
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const EMPTY_PROFILE_SKILLS: ProfileSkill[] = [];
  const EMPTY_SKILLS: Skill[] = [];
  const EMPTY_CATEGORIES: SkillCategory[] = [];

  const loading = profileLoading || skillsLoading || categoriesLoading;
  const userSkills = profileData?.profile?.skills ?? EMPTY_PROFILE_SKILLS;
  const allSkills = skillsData?.skills ?? EMPTY_SKILLS;
  const categories = categoriesData?.skillCategories ?? EMPTY_CATEGORIES;

  const groupedSkills: GroupedSkill[] = useMemo(() => {
    return categories
      .map((category) => ({
        categoryName: category.name,
        skills: userSkills.filter(
          (skill) => String(skill.categoryId) === String(category.id),
        ),
      }))
      .filter((group) => group.skills.length > 0);
  }, [categories, userSkills]);

  if (loading) return <Preloader />;

  const handleOpenAdd = () => {
    if (readOnly) return;

    setDialogMode("add");
    setEditingSkill(undefined);
    setIsDeleteMode(false);
    setIsDialogOpen(true);
  };

  const handleOpenUpdate = (skill: ProfileSkill) => {
    if (readOnly || isDeleteMode) return;

    setDialogMode("update");
    setEditingSkill({
      name: skill.name,
      categoryId: skill.categoryId ?? null,
      mastery: skill.mastery,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (name: string) => {
    if (readOnly) return;

    try {
      await deleteSkill({
        variables: {
          userId,
          name: [name],
        },
      });

      await refetch();
    } catch (error) {
      console.log("Delete skill error:", error);
    }
  };

  const handleSubmit = async (values: SkillFormState) => {
    if (readOnly) return;

    try {
      if (dialogMode === "add") {
        await addSkill({
          variables: {
            userId,
            name: values.name,
            categoryId: values.categoryId ?? null,
            mastery: values.mastery,
          },
        });
      } else {
        await updateSkill({
          variables: {
            userId,
            name: values.name,
            categoryId: values.categoryId ?? null,
            mastery: values.mastery,
          },
        });
      }

      await refetch();
      setIsDialogOpen(false);
    } catch (error) {
      console.log("Skill mutation error:", error);
    }
  };

  const getMasteryStyles = (mastery: string) => {
    switch (mastery) {
      case "Expert":
        return {
          fillColor: "#EF4444",
          trackColor: "#8a3131",
          width: "100%",
        };
      case "Proficient":
        return {
          fillColor: "#F59E0B",
          trackColor: "#83651a",
          width: "75%",
        };
      case "Competent":
        return {
          fillColor: "#22C55E",
          trackColor: "#367c4b",
          width: "55%",
        };
      case "Advanced":
        return {
          fillColor: "#38BDF8",
          trackColor: "#3c708f",
          width: "35%",
        };
      case "Novice":
        return {
          fillColor: "#38BDF8",
          trackColor: "#377294",
          width: "20%",
        };
      default:
        return {
          fillColor: "#6B7280",
          trackColor: "#374151",
          width: "0%",
        };
    }
  };

  return (
    <>
      <UserSkillsUI
        readOnly={readOnly}
        groupedSkills={groupedSkills}
        isDeleteMode={isDeleteMode}
        onAdd={handleOpenAdd}
        onToggleDeleteMode={() => setIsDeleteMode((prev) => !prev)}
        onUpdate={handleOpenUpdate}
        onDelete={handleDelete}
        getMasteryStyles={getMasteryStyles}
      />

      {!readOnly && (
        <SkillDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          mode={dialogMode}
          initialData={editingSkill}
          allSkills={allSkills}
          userSkills={userSkills}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};
