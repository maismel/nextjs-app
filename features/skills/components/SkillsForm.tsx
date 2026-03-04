import { useState } from "react";
import type { AddCvSkillInput } from "cv-graphql";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

enum Mastery {
  Novice = "Novice",
  Advanced = "Advanced",
  Competent = "Competent",
  Proficient = "Proficient",
  Expert = "Expert",
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
      <Select
        value={form.skillId}
        onValueChange={(value) =>
          setForm((prev) => ({ ...prev, skillId: value }))
        }
        disabled={!!initialValues?.categoryId}
      >
        <SelectTrigger aria-invalid={false} className="w-full">
          <SelectValue placeholder="Select skill" />
        </SelectTrigger>

        <SelectContent position="popper" align="start">
          <SelectGroup>
            {skills.map((skill) => (
              <SelectItem key={skill.id} value={skill.id}>
                {skill.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={form.mastery}
        onValueChange={(value) =>
          setForm((prev) => ({
            ...prev,
            mastery: value as Mastery,
          }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select mastery level" />
        </SelectTrigger>

        <SelectContent position="popper" align="start">
          <SelectGroup>
            {masteryOptions.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

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
