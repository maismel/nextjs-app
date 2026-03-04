"use client";

import { useExportPdf } from "@/features/preview/api/exportPdf";
import { useGetCvPreview } from "@/features/preview/api/getCvPreview";
import { CvHeader } from "@/features/preview/components/CvHeader";
import { CvSummary } from "@/features/preview/components/CvSummary";
import { ProjectPreview } from "@/features/preview/components/ProjectPreview";
import { SkillsTable } from "@/features/preview/components/SkillsTable";
import { useGetSkills } from "@/features/skills/api/getSkills";
import { groupUserSkills } from "@/features/skills/helpers/groupUserSkills";
import { useParams } from "next/navigation";

export const PreviewPage = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const { data: allSkills } = useGetSkills();
  const { data } = useGetCvPreview(cvId);
  const [exportPdf] = useExportPdf()

  const cvData = data?.cv;
  const userData = cvData?.user;
  const allSkillsList = allSkills?.skills ?? [];
  const userSkillsList = cvData?.skills ?? [];

  const groupedUserSkills = groupUserSkills(allSkillsList, userSkillsList);

  const handleExport = async () => {
    const html = document.getElementById("cv-content")?.innerHTML;

    if (!html) return;

    const { data, error } = await exportPdf({
      variables: {
        pdf: {
          html,
          margin: {
            top: '10',
            bottom: '10',
            left: '10',
            right: '10',
          },
        },
      },
    });

    console.log("error", error);
    console.log("PDF result:", data?.exportPdf);
  };

  return (
    <section
      id="cv-content"
      className="flex flex-col gap-8 w-full max-w-4xl px-6 py-8"
    >
      <CvHeader user={userData} onExport={handleExport} />
      <CvSummary
        education={cvData?.education}
        name={cvData?.name}
        description={cvData?.description}
      />
      <article className="flex flex-col gap-8">
        <h1 className="text-3xl">Projects</h1>
        {cvData?.projects.map((project) => (
          <ProjectPreview key={project.name} project={project} />
        ))}
      </article>
      <article>
        <h1 className="text-3xl">Professional Skills</h1>
        <SkillsTable groupedSkills={groupedUserSkills} />
      </article>
    </section>
  );
};
