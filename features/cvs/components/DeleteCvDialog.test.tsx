import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteCvDialog } from "./DeleteCvDialog";

describe("DeleteCvDialog", () => {
  const mockOnOpenChange = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders dialog with title and description", () => {
    render(
      <DeleteCvDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.getByText("Create CV")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("calls onOpenChange(false) when Cancel is clicked", () => {
    render(
      <DeleteCvDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
      />,
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  test("calls onConfirm and onOpenChange(false) when Delete is clicked", () => {
    render(
      <DeleteCvDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
      />,
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnConfirm).toHaveBeenCalled();
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });
});
