import { InfoBlock } from "@/features/preview/components/InfoBlock";

interface CvSummaryProps {
  name?: string;
  description?: string;
  education?: string;
}

export const CvSummary = ({ name, description, education }: CvSummaryProps) => {
  return (
    <article className="grid grid-cols-[1fr_2.3fr] divide-x divide-destructive">
      <div className="flex flex-col gap-2 pr-6">
        <InfoBlock title="Education">
          <p>{education}</p>
        </InfoBlock>

        <div>
          <p className="font-semibold">Language Proficiency</p>
          <p>-</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 pl-6">
        <p>{name}</p>
        <p>{description}</p>
      </div>
    </article>
  );
};
