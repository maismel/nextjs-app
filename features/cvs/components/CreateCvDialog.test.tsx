import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateCvDialog } from "./CreateCvDialog";
import { useCvsActions } from "@/features/cvs/hooks/useCvsActions";

jest.mock("@/features/cvs/hooks/useCvsActions", () => ({
  useCvsActions: jest.fn(),
}));

describe("CreateCvDialog", () => {
  const mockHandleCreateCv = jest.fn(() => Promise.resolve());
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCvsActions as jest.Mock).mockReturnValue({
      handleCreateCv: mockHandleCreateCv,
    });
  });

  test("renders dialog and form", () => {
    render(<CreateCvDialog open={true} onOpenChange={mockOnOpenChange} />);
    expect(screen.getByText("Create CV")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });

  test("submits form and closes dialog", async () => {
    render(<CreateCvDialog open={true} onOpenChange={mockOnOpenChange} />);

    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Alice" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Frontend dev" } });

    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(mockHandleCreateCv).toHaveBeenCalledWith({
        name: "Alice",
        description: "Frontend dev",
      });
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  test("closes dialog on cancel", () => {
    render(<CreateCvDialog open={true} onOpenChange={mockOnOpenChange} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });
});
