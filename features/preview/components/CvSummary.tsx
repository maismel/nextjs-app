import { InfoBlock } from "@/features/preview/components/InfoBlock";

interface CvSummaryProps {
  name?: string;
  description?: string;
  education?: string;
  languages?: { name: string; proficiency: string }[];
}

export const CvSummary = ({ name, description, education, languages }: CvSummaryProps) => {
  return (
    <article className="grid grid-cols-[1fr_2.3fr] divide-x divide-destructive">
      <div className="flex flex-col gap-2 pr-6">
        <InfoBlock title="Education">
          <p>{education}</p>
        </InfoBlock>

        <div>
          <p className="font-semibold">Language Proficiency</p>
          {languages && languages.length > 0 ? (
            <ul className="list-disc list-inside">
              {languages.map((lang) => (
                <li key={lang.name}>
                  {lang.name} — {lang.proficiency}
                </li>
              ))}
            </ul>
          ) : (
            <p>-</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 pl-6">
        <p>{name}</p>
        <p>{description}</p>
      </div>
    </article>
  );
};
