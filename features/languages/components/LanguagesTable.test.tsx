import { render, screen, fireEvent } from "@testing-library/react";
import { LanguagesTable } from "./LanguagesTable";
import { columnNames } from "@/features/languages/pages/LanguagesPage";

const mockHandleSort = jest.fn();

jest.mock("@/features/shared/components/RowActions", () => ({
  RowActions: () => <div>Actions</div>,
}));

describe("LanguagesTable", () => {
  const data = [
    {
      id: "1",
      name: "English",
      native_name: "English",
      iso2: "EN",
    },
    {
      id: "2",
      name: "Polish",
      native_name: "Język polski",
      iso2: "PL",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table headers", () => {
    render(
      <LanguagesTable
        columnNames={columnNames}
        data={data}
        handleSort={mockHandleSort}
      />,
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Native name")).toBeInTheDocument();
    expect(screen.getByText("Iso2")).toBeInTheDocument();
  });

  test("renders language rows", () => {
    render(
      <LanguagesTable
        columnNames={columnNames}
        data={data}
        handleSort={mockHandleSort}
      />,
    );

    expect(screen.getByText("Język polski")).toBeInTheDocument();
    expect(screen.getByText("PL")).toBeInTheDocument();
  });

  test("calls handleSort when sort button is clicked", () => {
    render(
      <LanguagesTable
        columnNames={columnNames}
        data={data}
        handleSort={mockHandleSort}
      />,
    );

    const sortButtons = screen.getAllByRole("button");
    fireEvent.click(sortButtons[0]);

    expect(mockHandleSort).toHaveBeenCalled();
  });
});
