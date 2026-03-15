import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AddCvProjectInput, CvProject } from "cv-graphql";
import { useMemo, useState } from "react";
import { DateInput } from "@/features/shared/components/DateInput";
import { format } from "date-fns";

type FormState = {
  start_date?: Date;
  end_date?: Date;
  roles: string;
  responsibilities: string;
};

interface ProjectFormProps {
  onSubmit: (values: Omit<AddCvProjectInput, "cvId" | "projectId">) => void;
  onCancel: () => void;
  projectData?: Partial<CvProject>;
}

export const ProjectForm = ({
  onSubmit,
  onCancel,
  projectData,
}: ProjectFormProps) => {
  const initialForm = useMemo(
    () => ({
      start_date: projectData?.start_date
        ? new Date(projectData.start_date)
        : undefined,
      end_date: projectData?.end_date
        ? new Date(projectData.end_date)
        : undefined,
      roles: projectData?.roles?.join(", ") || "",
      responsibilities: projectData?.responsibilities?.join(", ") || "",
    }),
    [projectData],
  );
  const [form, setForm] = useState<FormState>(initialForm);

  const isNotEmpty = (v: string) => v.trim().length > 0;
  const isChanged =
    form.start_date?.toISOString() !== initialForm.start_date?.toISOString() ||
    form.end_date?.toISOString() !== initialForm.end_date?.toISOString() ||
    form.roles.trim() !== initialForm.roles.trim() ||
    form.responsibilities.trim() !== initialForm.responsibilities.trim();

  const isDateRangeValid =
    !form.start_date || !form.end_date || form.start_date <= form.end_date;

  const isValid =
    !!form.start_date &&
    isNotEmpty(form.roles) &&
    isNotEmpty(form.responsibilities) &&
    isDateRangeValid &&
    isChanged;

  const updateField = (
    field: keyof FormState,
    value: string | Date | undefined,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const roles = form.roles
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    const responsibilities = form.responsibilities
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    const start_date = form.start_date
      ? format(form.start_date, "yyyy-MM-dd")
      : "";

    const end_date = form.end_date
      ? format(form.end_date, "yyyy-MM-dd")
      : undefined;

    const normalized = {
      start_date,
      roles,
      responsibilities,
      ...(end_date && { end_date }),
    };

    onSubmit(normalized);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between gap-12">
        <div className="w-full space-y-2">
          <Label>Project name</Label>
          <Input value={projectData?.name ?? ""} disabled />
        </div>

        <div className="w-full space-y-2">
          <Label>Domain</Label>
          <Input value={projectData?.domain ?? ""} disabled />
        </div>
      </div>

      <div className="w-full flex justify-between gap-12">
        <div className="w-full space-y-2">
          <Label>Start date</Label>
          <DateInput
            value={form.start_date}
            onChange={(date) => updateField("start_date", date)}
            placeholder="Pick start date"
            minDate={
              projectData?.start_date
                ? new Date(projectData.start_date)
                : new Date()
            }
            maxDate={
              projectData?.end_date
                ? new Date(projectData.end_date)
                : new Date()
            }
          />
        </div>

        <div className="w-full space-y-2">
          <Label>End date</Label>
          <DateInput
            value={form.end_date}
            onChange={(date) => updateField("end_date", date)}
            placeholder="Pick end date"
            minDate={
              projectData?.start_date
                ? new Date(projectData.start_date)
                : new Date()
            }
            maxDate={
              projectData?.end_date
                ? new Date(projectData.end_date)
                : new Date()
            }
          />
        </div>
      </div>

      <div className="w-full space-y-2">
        <Label>Description</Label>
        <Textarea
          className="h-30 overflow-y-auto resize-none"
          value={projectData?.description ?? ""}
          disabled
        />
      </div>

      <div className="w-full space-y-2">
        <Label>Environment</Label>
        <Input value={projectData?.environment?.join(", ") ?? ""} disabled />
      </div>

      <div className="w-full space-y-2">
        <Label>Roles</Label>
        <Input
          placeholder="Roles"
          value={form.roles}
          onChange={(e) => updateField("roles", e.target.value)}
        />
      </div>

      <div className="w-full space-y-2">
        <Label>Responsibilities</Label>
        <Textarea
          placeholder="Responsibilities"
          value={form.responsibilities}
          onChange={(e) => updateField("responsibilities", e.target.value)}
        />
      </div>

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
          type="submit"
          disabled={!isValid}
          variant="destructive"
          size="lg"
          className="w-40"
        >
          Save
        </Button>
      </div>
    </form>
  );
};
