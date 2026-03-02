import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CreateProjectInput } from "cv-graphql";
import { useState } from "react";

type FormState = {
  name: string;
  domain: string;
  start_date: string;
  end_date: string;
  description: string;
  environment: string[];
};

interface ProjectFormProps {
  onSubmit: (values: CreateProjectInput) => void;
  onCancel: () => void;
}

export const ProjectForm = ({ onSubmit, onCancel }: ProjectFormProps) => {
  const initialState = {
    name: "",
    domain: "",
    start_date: "",
    end_date: "",
    description: "",
    environment: [],
  };
  const [form, setForm] = useState<FormState>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = form.name.trim();
    const domain = form.domain.trim();
    const start_date = form.start_date.trim();
    const end_date = form.end_date?.trim();
    const description = form.description.trim();
    const environment = form.environment;

    const normalized = {
      name,
      domain,
      start_date,
      description,
      environment,
      ...(end_date && { end_date }),
    };

    onSubmit(normalized);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
      <div className="w-full flex justify-between gap-12">
        <Input
          name="name"
          placeholder="Project name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <Input
          name="domain"
          placeholder="Domain"
          required
          value={form.domain}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex justify-between gap-12">
        <Input
          name="startDate"
          placeholder="Start Date"
          required
          value={form.start_date}
          onChange={handleChange}
        />
        <Input
          name="endDate"
          placeholder="End Date"
          value={form.end_date}
          onChange={handleChange}
        />
      </div>
      <Textarea
        name="description"
        placeholder="Description"
        className="h-40 overflow-y-auto resize-none"
        required
        value={form.description}
        onChange={handleChange}
      />
      <Input
        name="environment"
        placeholder="Environment"
        required
        value={form.environment}
        onChange={handleChange}
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
        <Button type="submit" variant="destructive" size="lg" className="w-40">
          Add
        </Button>
      </div>
    </form>
  );
};
