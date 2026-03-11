import { render, screen } from "@testing-library/react";
import { LanguagesPage } from "./LanguagesPage";
import { SkillsTableProps } from "@/features/languages/components/LanguagesTable";

const mockSetSearch = jest.fn();
const mockHandleSort = jest.fn();

jest.mock("@/features/languages/api/getLanguages", () => ({
  useGetLanguages: () => ({
    data: {
      languages: [
        { id: "1", name: "English", native_name: "English", iso2: "EN" },
      ],
    },
  }),
}));

jest.mock("@/hooks/useSortTable", () => ({
  useSortTable: () => ({
    processedData: [
      { id: "1", name: "English", native_name: "English", iso2: "EN" },
    ],
    search: "",
    setSearch: mockSetSearch,
    handleSort: mockHandleSort,
  }),
}));

jest.mock("@/features/languages/components/LanguagesTable", () => ({
  LanguagesTable: ({ data }: SkillsTableProps) => (
    <div data-testid="languages-table">{data.length}</div>
  ),
}));

describe("LanguagesPage", () => {
  test("renders toolbar and table", () => {
    render(<LanguagesPage />);

    expect(screen.getByTestId("languages-table")).toBeInTheDocument();
  });
});
