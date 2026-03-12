"use client";

import { useEffect, useMemo, useState } from "react";
import { Skill } from "../api/getSkills";
import { SkillDialogUI } from "./SkillDialogUI";

const MASTERY_LEVELS = [
  { label: "Novice", value: "Novice" },
  { label: "Advanced", value: "Advanced" },
  { label: "Competent", value: "Competent" },
  { label: "Proficient", value: "Proficient" },
  { label: "Expert", value: "Expert" },
];

export type SkillFormState = {
  name: string;
  categoryId?: string | null;
  mastery: string;
};

interface SkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "update";
  initialData?: SkillFormState;
  allSkills: Skill[];
  userSkills: { name: string }[];
  onSubmit: (values: SkillFormState) => Promise<void>;
}

export const SkillDialog = ({
  open,
  onOpenChange,
  mode,
  initialData,
  allSkills,
  userSkills,
  onSubmit,
}: SkillDialogProps) => {
  const [form, setForm] = useState<SkillFormState>({
    name: "",
    categoryId: null,
    mastery: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(
        initialData || {
          name: "",
          categoryId: null,
          mastery: "",
        },
      );
    }
  }, [open, initialData]);

  const availableSkills = useMemo(() => {
    if (mode === "update") {
      return allSkills.filter((skill) => skill.name === initialData?.name);
    }

    return allSkills.filter(
      (skill) => !userSkills.some((userSkill) => userSkill.name === skill.name),
    );
  }, [allSkills, userSkills, mode, initialData]);

  const isChanged =
    form.name !== initialData?.name || form.mastery !== initialData?.mastery;

  const isValid = form.name.trim() && form.mastery.trim();
  const disabled = loading || !isValid || (mode === "update" && !isChanged);

  const handleSkillChange = (name: string) => {
    const selectedSkill = allSkills.find((skill) => skill.name === name);

    setForm((prev) => ({
      ...prev,
      name,
      categoryId: selectedSkill?.category?.id ?? null,
    }));
  };

  const handleMasteryChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      mastery: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;

    setLoading(true);
    try {
      await onSubmit(form);
    } catch (error) {
      console.log("Submit skill error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SkillDialogUI
      open={open}
      onOpenChange={onOpenChange}
      mode={mode}
      form={form}
      loading={loading}
      disabled={disabled}
      availableSkills={availableSkills}
      masteryLevels={MASTERY_LEVELS}
      onSkillChange={handleSkillChange}
      onMasteryChange={handleMasteryChange}
      onSubmit={handleSubmit}
    />
  );
};
