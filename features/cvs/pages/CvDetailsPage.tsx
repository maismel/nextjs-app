"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCvsActions } from "@/features/cvs/hooks/useCvsActions";
import { useParams } from "next/navigation";
import { useState } from "react";

type CvFormState = {
  name: string;
  education: string;
  description: string;
};


export const CvDetailsPage = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const { handleUpdateCv } = useCvsActions();

  const initialForm: CvFormState = {
    name: "",
    education: "",
    description: "",
  };

  const [form, setForm] = useState(initialForm);

  const isDisabled = !form.name.trim() || !form.description.trim();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, description, education } = form;
    handleUpdateCv({
      cvId,
      name,
      description,
      education: education || undefined,
    });
    setForm(initialForm);
  };

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
      <Button
        variant="destructive"
        className="w-full max-w-md"
        type="submit"
        disabled={isDisabled}
      >
        Update
      </Button>
    </form>
  );
};
