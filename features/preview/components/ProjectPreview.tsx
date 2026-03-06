import { GetCvPreviewResponse } from "@/features/preview/api/getCvPreview";
import { InfoBlock } from "@/features/preview/components/InfoBlock";

interface ProjectProps {
  project: GetCvPreviewResponse["cv"]["projects"][number];
}

export const ProjectPreview = ({ project }: ProjectProps) => {
  return (
    <div className="grid grid-cols-[1fr_2.3fr] divide-x divide-destructive">
      <div className="flex flex-col gap-2 pr-4">
        <p className="text-destructive font-semibold">
          {project.name.toUpperCase()}
        </p>
        <p>{project.description}</p>
      </div>

      <div className="flex flex-col gap-4 pl-6">
        <InfoBlock title="Project Roles">{project.roles.join(", ")}</InfoBlock>

        <InfoBlock title="Period">
          {`${project.start_date} - ${project.end_date ?? "Till now"}`}
        </InfoBlock>

        <InfoBlock title="Responsibilities">
          <ul className="list-disc pl-5">
            {project.responsibilities.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </InfoBlock>

        <InfoBlock title="Environment">
          {project.environment.join(", ")}
        </InfoBlock>
      </div>
    </div>
  );
};
