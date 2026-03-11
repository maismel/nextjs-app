import { render, screen, fireEvent } from "@testing-library/react";
import { CvForm, CvFormState } from "./CvForm";

describe("CvForm component", () => {
  const mockSubmit = jest.fn();
  const mockCancel = jest.fn();

  const initialValues: CvFormState = {
    name: "John Doe",
    education: "Bachelor of Science",
    description: "Experienced developer",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form with initial values", () => {
    render(
      <CvForm
        initialValues={initialValues}
        onSubmit={mockSubmit}
        onCancelButton={mockCancel}
      />,
    );

    expect(screen.getByPlaceholderText("Name")).toHaveValue("John Doe");
    expect(screen.getByPlaceholderText("Education")).toHaveValue(
      "Bachelor of Science",
    );
    expect(screen.getByPlaceholderText("Description")).toHaveValue(
      "Experienced developer",
    );
    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("allows user to input values and submit the form", () => {
    render(<CvForm onSubmit={mockSubmit} />);

    const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
    const educationInput = screen.getByPlaceholderText(
      "Education",
    ) as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      "Description",
    ) as HTMLTextAreaElement;
    const submitButton = screen.getByText("Update") as HTMLButtonElement;

    expect(submitButton).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: "Alice" } });
    fireEvent.change(educationInput, { target: { value: "Master's" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Frontend developer" },
    });

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "Alice",
      education: "Master's",
      description: "Frontend developer",
    });
  });

  test("calls onCancelButton when Cancel is clicked", () => {
    render(<CvForm onSubmit={mockSubmit} onCancelButton={mockCancel} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockCancel).toHaveBeenCalled();
  });

  test("trims values before submitting", () => {
    render(<CvForm onSubmit={mockSubmit} />);
    const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      "Description",
    ) as HTMLTextAreaElement;
    const submitButton = screen.getByText("Update") as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: "  Alice  " } });
    fireEvent.change(descriptionInput, { target: { value: "  Developer  " } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "Alice",
      description: "Developer",
    });
  });
});
