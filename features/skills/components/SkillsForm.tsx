import { useState } from "react";
import type { AddCvSkillInput } from "cv-graphql";
import { Mastery } from "cv-graphql";
import { Button } from "@/components/ui/button";
import { AppSelect } from "@/features/shared/components/AppSelect";

interface SkillOption {
  id: string;
  name: string;
}

interface SkillsFormProps {
  skills: SkillOption[];
  onCancel: () => void;
  onSubmit: (values: Omit<AddCvSkillInput, "cvId">) => void;
  initialValues?: {
    categoryId: string;
    mastery: string;
  };
}

interface FormState {
  skillId: string;
  mastery: string;
}

export const masteryOptions = Object.values(Mastery);
export const SkillsForm = ({
  skills,
  initialValues,
  onCancel,
  onSubmit,
}: SkillsFormProps) => {
  const [form, setForm] = useState<FormState>({
    skillId: initialValues?.categoryId ?? "",
    mastery: initialValues?.mastery ?? "",
  });

  const isDisabled = !form.skillId || !form.mastery.trim();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedSkill = skills.find((skill) => skill.id === form.skillId);

    if (!selectedSkill) return;

    const normalized = {
      name: selectedSkill.name,
      categoryId: selectedSkill.id,
      mastery: form.mastery as Mastery,
    };

    onSubmit(normalized);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <AppSelect
        value={form.skillId}
        onChange={(value) => setForm((prev) => ({ ...prev, skillId: value }))}
        options={skills.map((s) => ({
          value: s.id,
          label: s.name,
        }))}
        placeholder="Select skill"
        disabled={!!initialValues?.categoryId}
      />
      <AppSelect
        value={form.mastery}
        onChange={(value) =>
          setForm((prev) => ({
            ...prev,
            mastery: value as Mastery,
          }))
        }
        options={masteryOptions.map((mastery) => ({
          value: mastery,
          label: mastery,
        }))}
        placeholder="Select mastery"
      />

      <div className="w-full flex gap-4 justify-end">
        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="w-40"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={isDisabled}
          type="submit"
          variant="destructive"
          size="lg"
          className="w-40"
        >
          {initialValues?.categoryId ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
};
