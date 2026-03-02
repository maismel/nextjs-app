"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type CvFormState = {
  name: string;
  education?: string;
  description: string;
};

interface CvFormProps {
  initialValues?: CvFormState;
  onSubmit: (values: CvFormState) => void;
  buttonText?: string;
  onCancelButton?: () => void;
}

const defaultValues: CvFormState = {
  name: "",
  education: "",
  description: "",
};

export const CvForm = ({
  initialValues = defaultValues,
  onSubmit,
  buttonText = "Update",
  onCancelButton,
}: CvFormProps) => {
  const [form, setForm] = useState(initialValues);

  const isDisabled = !form.name.trim() || !form.description.trim();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalized = {
      name: form.name.trim(),
      description: form.description.trim(),
      ...(form.education?.trim() && {
        education: form.education.trim(),
      }),
    };

    onSubmit(normalized);
    setForm(defaultValues);
  };

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-end self-end gap-9 w-full max-w-4xl"
    >
      <Input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <Input
        name="education"
        placeholder="Education"
        value={form.education}
        onChange={handleChange}
      />
      <Textarea
        name="description"
        placeholder="Description"
        className="h-40 overflow-y-auto resize-none"
        value={form.description}
        onChange={handleChange}
      />
      <div className="flex justify-end gap-4 w-full">
        {onCancelButton && (
          <Button
            variant="ghost"
            size="lg"
            className="w-40"
            type="button"
            onClick={onCancelButton}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="destructive"
          size="lg"
          className={cn(onCancelButton ? "w-40" : "w-full max-w-md")}
          type="submit"
          disabled={isDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};
