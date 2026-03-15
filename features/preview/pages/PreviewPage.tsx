"use client";

import { useExportPdf } from "@/features/preview/api/exportPdf";
import { useGetCvPreview } from "@/features/preview/api/getCvPreview";
import { CvHeader } from "@/features/preview/components/CvHeader";
import { CvSummary } from "@/features/preview/components/CvSummary";
import { ProjectPreview } from "@/features/preview/components/ProjectPreview";
import { SkillsTable } from "@/features/preview/components/SkillsTable";
import { useGetSkills } from "@/features/skills/api/getSkills";
import { groupUserSkills } from "@/features/skills/helpers/groupUserSkills";
import { useGetProfileLanguages } from "@/features/users/languages/api/getProfileLanguages";
import { copyStylesRecursive } from "@/helpers/copyStylesRecursive";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";
import { openPdfFromBase64 } from "@/helpers/openPdfFromBase64";
import { useParams } from "next/navigation";

export const PreviewPage = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const userId = getUserIdFromToken()
  const { data: allSkills } = useGetSkills();
  const { data: userLangs } = useGetProfileLanguages(String(userId));
  const { data } = useGetCvPreview(cvId);
  const [exportPdf] = useExportPdf()

  const cvData = data?.cv;
  const userData = cvData?.user;
  const allSkillsList = allSkills?.skills ?? [];
  const userSkillsList = cvData?.skills ?? [];

  const groupedUserSkills = groupUserSkills(allSkillsList, userSkillsList);

  const handleExport = async () => {
    const cvElement = document.getElementById("cv-content");
    if (!cvElement) return;

    const cloneElement = cvElement.cloneNode(true) as HTMLElement;

    copyStylesRecursive(cvElement, cloneElement);

    const html = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, sans-serif;
            background: white;
            color: black;
          }
          * { box-sizing: border-box; }
        </style>
      </head>
      <body>
        ${cloneElement.outerHTML}
      </body>
    </html>
  `;

    const { data, error } = await exportPdf({
      variables: {
        pdf: {
          html,
          margin: { top: "10", bottom: "10", left: "10", right: "10" },
        },
      },
    });

    if (data?.exportPdf) {
      openPdfFromBase64(data.exportPdf, "resume.pdf");
    }

    if (error) console.log("PDF export error:", error);
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
        languages={userLangs?.profile.languages}
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
