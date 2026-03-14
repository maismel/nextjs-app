"use client";

import { useCvsActions } from "@/features/cvs/hooks/useCvsActions";
import { useParams } from "next/navigation";
import { CvForm } from "@/features/cvs/components/CvForm";
import { useGetCvById } from "@/features/cvs/api/getCvById";
import { Preloader } from "@/components/ui/Preloader";

type CvFormState = {
  name: string;
  education: string;
  description: string;
};

export const CvDetailsPage = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const { handleUpdateCv } = useCvsActions();
  const { data: cvData, loading } = useGetCvById(cvId);

  const initialForm: CvFormState = {
    name: cvData?.cv.name ?? "",
    education: cvData?.cv.education ?? "",
    description: cvData?.cv.description ?? "",
  };

  return (
    <>
      <Preloader loading={loading} />
      <CvForm
        initialValues={initialForm}
        onSubmit={(values) =>
          handleUpdateCv({
            cvId,
            ...values,
          })
        }
      />
    </>
  );
};
