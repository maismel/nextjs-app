import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmDialog } from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  const mockOnOpenChange = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders dialog with title and description", () => {
    render(
      <ConfirmDialog
        title="Delete CV"
        description="Are you sure you want to delete?"
        open={true}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.getByText("Delete CV")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  test("uses default description when none provided", () => {
    render(
      <ConfirmDialog
        title="Delete CV"
        open={true}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(
      screen.getByText("Are you sure you want to delete?"),
    ).toBeInTheDocument();
  });

  test("calls onOpenChange(false) when Cancel is clicked", () => {
    render(
      <ConfirmDialog
        title="Delete CV"
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
      <ConfirmDialog
        title="Delete CV"
        open={true}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
      />,
    );

    fireEvent.click(screen.getByText("Confirm"));

    expect(mockOnConfirm).toHaveBeenCalled();
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });
});
