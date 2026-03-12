import { fireEvent, render, screen } from "@testing-library/react";
import { UserSkillsUI } from "./UserSkillsUI";

describe("UserSkillsUI", () => {
  const props = {
    readOnly: false,
    groupedSkills: [
      {
        categoryName: "Frontend",
        skills: [{ name: "React", mastery: "Expert", categoryId: "1" }],
      },
    ],
    isDeleteMode: false,
    onAdd: jest.fn(),
    onToggleDeleteMode: jest.fn(),
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
    getMasteryStyles: () => ({
      fillColor: "#f00",
      trackColor: "#000",
      width: "100%",
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders grouped skills and action buttons", () => {
    render(<UserSkillsUI {...props} />);

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Add skill")).toBeInTheDocument();
    expect(screen.getByText("Remove skills")).toBeInTheDocument();
  });

  test("calls handlers for add and toggle delete mode", () => {
    render(<UserSkillsUI {...props} />);

    fireEvent.click(screen.getByText("Add skill"));
    fireEvent.click(screen.getByText("Remove skills"));

    expect(props.onAdd).toHaveBeenCalled();
    expect(props.onToggleDeleteMode).toHaveBeenCalled();
  });

  test("calls onUpdate when a skill is clicked", () => {
    render(<UserSkillsUI {...props} />);

    fireEvent.click(screen.getByText("React"));

    expect(props.onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ name: "React", mastery: "Expert" }),
    );
  });
});
