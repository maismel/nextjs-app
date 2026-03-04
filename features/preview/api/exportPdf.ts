import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { ExportPdfInput } from "cv-graphql";

interface ExportPdfArgs {
  pdf: ExportPdfInput;
}

interface ExportPdfResp {
    exportPdf: string;
}
const EXPORT_PDF = gql`
  mutation ExportPdf($pdf: ExportPdfInput!) {
    exportPdf(pdf: $pdf)
  }
`;

export const useExportPdf = () => {
    return useMutation<ExportPdfResp, ExportPdfArgs>(EXPORT_PDF);
}

