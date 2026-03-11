import { render, screen } from "@testing-library/react";
import { RowActions, RowAction } from "./RowActions";

describe("RowActions", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const actions: RowAction[] = [
    { label: "Update", onClick: mockOnEdit },
    {
      label: "Delete",
      onClick: mockOnDelete,
      variant: "destructive",
      showSeparatorBefore: true,
    },
  ];

  beforeEach(() => jest.clearAllMocks());

  test("renders trigger button", () => {
    render(<RowActions id="1" actions={actions} />);
    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toBeInTheDocument();
  });
});
