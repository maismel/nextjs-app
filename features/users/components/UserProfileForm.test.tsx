import { fireEvent, render, screen } from "@testing-library/react";
import { UserProfileForm } from "./UserProfileForm";

jest.mock("@/features/users/components/AvatarUploadBlock", () => ({
  AvatarUploadBlock: ({
    onUpload,
    disabled,
  }: {
    onUpload?: (file: File) => void;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      disabled={disabled}
      onClick={() =>
        onUpload?.(new File(["avatar"], "avatar.png", { type: "image/png" }))
      }
    >
      Upload avatar
    </button>
  ),
}));

jest.mock("@/components/ui/select", () => ({
  Select: ({
    value,
    onValueChange,
    children,
  }: {
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
  }) => (
    <div data-value={value}>
      <button type="button" onClick={() => onValueChange?.("selected-value")}>
        Select trigger
      </button>
      {children}
    </div>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
}));

describe("UserProfileForm", () => {
  const baseProps = {
    userEmail: "alice@mail.com",
    avatar: null,
    fullName: "Alice Cooper",
    createdAt: "2024-01-01T00:00:00.000Z",
    departments: [{ id: "1", name: "Frontend" }],
    positions: [{ id: "2", name: "Developer" }],
    initialValues: {
      first_name: "Alice",
      last_name: "Cooper",
      departmentId: "1",
      positionId: "2",
    },
    onSubmit: jest.fn(),
    onUploadAvatar: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders initial profile values", () => {
    render(<UserProfileForm {...baseProps} />);

    expect(screen.getByPlaceholderText("First Name")).toHaveValue("Alice");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("Cooper");
    expect(screen.getByText("A member since Mon Jan 01 2024")).toBeInTheDocument();
  });

  test("submits trimmed profile values after changes", () => {
    render(<UserProfileForm {...baseProps} />);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "  Alicia  " },
    });

    fireEvent.click(screen.getByText("Update"));

    expect(baseProps.onSubmit).toHaveBeenCalledWith({
      first_name: "Alicia",
      last_name: "Cooper",
      departmentId: "1",
      positionId: "2",
    });
  });

  test("disables submit button for read-only mode", () => {
    render(<UserProfileForm {...baseProps} readOnly={true} />);

    expect(screen.getByText("Update")).toBeDisabled();
  });

  test("calls avatar upload handler", () => {
    render(<UserProfileForm {...baseProps} />);

    fireEvent.click(screen.getByText("Upload avatar"));

    expect(baseProps.onUploadAvatar).toHaveBeenCalled();
  });
});
