import { fireEvent, render, screen } from "@testing-library/react";
import { UserLanguagesUI } from "./UserLanguagesUI";

describe("UserLanguagesUI", () => {
  const props = {
    languages: [{ name: "English", proficiency: "Native" }],
    isEditable: true,
    onAdd: jest.fn(),
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders languages and add button", () => {
    render(<UserLanguagesUI {...props} />);

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Native")).toBeInTheDocument();
    expect(screen.getByText("Add language")).toBeInTheDocument();
  });

  test("calls onAdd when add button is clicked", () => {
    render(<UserLanguagesUI {...props} />);

    fireEvent.click(screen.getByText("Add language"));

    expect(props.onAdd).toHaveBeenCalled();
  });

  test("calls onUpdate when a language item is clicked", () => {
    render(<UserLanguagesUI {...props} />);

    fireEvent.click(screen.getByText("English"));

    expect(props.onUpdate).toHaveBeenCalledWith({
      name: "English",
      proficiency: "Native",
    });
  });

  test("calls onDelete in delete mode", () => {
    render(<UserLanguagesUI {...props} />);

    fireEvent.click(screen.getByText("Remove languages"));
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[2]);

    expect(props.onDelete).toHaveBeenCalledWith("English");
  });
});
