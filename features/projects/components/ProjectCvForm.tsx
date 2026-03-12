import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddCvProjectInput } from "cv-graphql";
import { useState } from "react";
import { DateInput } from "@/features/shared/components/DateInput";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

interface AddProjectToCvFormProps {
  onCancel: () => void;
  onSubmit: (values: Omit<AddCvProjectInput, "cvId" | "projectId">) => void;
}

interface FormState {
  start_date: Date | undefined;
  roles: string;
  responsibilities: string;
  end_date?: Date | undefined;
}

export const ProjectCvForm = ({
  onCancel,
  onSubmit,
}: AddProjectToCvFormProps) => {
  const initialState: FormState = {
    start_date: undefined,
    end_date: undefined,
    roles: "",
    responsibilities: "",
  };
  const [form, setForm] = useState<FormState>(initialState);

  const isDisabled =
    !form.start_date?.toDateString().trim() ||
    !form.roles.trim() ||
    !form.responsibilities.trim();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const start_date = form.start_date
      ? format(form.start_date, "yyyy-MM-dd")
      : "";
    const end_date = form.end_date ? format(form.end_date, "yyyy-MM-dd") : "";
    const roles = form.roles.trim().split(",");
    const responsibilities = form.responsibilities.trim().split(",");

    const normalized = {
      start_date,
      roles,
      responsibilities,
      ...(end_date && { end_date }),
    };

    onSubmit(normalized);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-3">
      <div className="w-full space-y-2">
        <Label htmlFor="start_date">Start date</Label>
        <DateInput
          value={form.start_date}
          onChange={(date) =>
            setForm((prev) => ({ ...prev, start_date: date }))
          }
          placeholder="Pick start date"
        />
      </div>

      <div className="w-full space-y-2">
        <Label htmlFor="end_date">End date</Label>
        <DateInput
          value={form.end_date}
          onChange={(date) => setForm((prev) => ({ ...prev, end_date: date }))}
          placeholder="Pick end date"
        />
      </div>

      <div className="w-full space-y-2">
        <Label htmlFor="roles">Roles</Label>
        <Input
          name="roles"
          placeholder="Roles"
          value={form.roles}
          onChange={handleChange}
        />
      </div>
      <div className="w-full space-y-2">
        <Label htmlFor="responsibilities">Responsibilities</Label>
        <Input
          name="responsibilities"
          placeholder="Responsibilities"
          value={form.responsibilities}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end gap-8">
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
          type="submit"
          variant="destructive"
          size="lg"
          className="w-40"
          disabled={isDisabled}
        >
          Add
        </Button>
      </div>
    </form>
  );
};
