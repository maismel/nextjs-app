import { render, screen, fireEvent } from "@testing-library/react";
import { CvsTable } from "./CvsTable";
import { columnNames } from "@/features/cvs/pages/CvsList";

describe("CvsTable basic tests", () => {
  const data = [
    {
      id: "1",
      name: "Alice",
      education: "Bachelor",
      email: "alice@example.com",
      description: "Frontend Dev",
    },
  ];

  const handleSort = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("renders headers and data", () => {
    render(
      <CvsTable
        columnNames={columnNames}
        data={data}
        handleSort={handleSort}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Frontend Dev")).toBeInTheDocument();
  });

  test("calls handleSort when clicking sortable header", () => {
    render(
      <CvsTable
        columnNames={columnNames}
        data={data}
        handleSort={handleSort}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    );

    const nameHeader = screen.getByText("Name");
    const sortButton = nameHeader.parentElement?.querySelector("button");
    if (sortButton) fireEvent.click(sortButton);

    expect(handleSort).toHaveBeenCalledWith("name");
  });
});
