import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SkillDialog } from "./SkillsDialog";

describe("SkillDialog", () => {
  const allSkills = [
    { id: "1", name: "React", category: { id: "cat-1", name: "Frontend" } },
    { id: "2", name: "Vue", category: { id: "cat-2", name: "Frontend" } },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("filters already used skills in add mode", () => {
    render(
      <SkillDialog
        open={true}
        onOpenChange={jest.fn()}
        mode="add"
        allSkills={allSkills}
        userSkills={[{ name: "React" }]}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByRole("option", { name: "Vue" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "React" })).not.toBeInTheDocument();
  });

  test("keeps only current skill in update mode", () => {
    render(
      <SkillDialog
        open={true}
        onOpenChange={jest.fn()}
        mode="update"
        initialData={{ name: "React", categoryId: "cat-1", mastery: "Expert" }}
        allSkills={allSkills}
        userSkills={[{ name: "React" }]}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByRole("option", { name: "React" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Vue" })).not.toBeInTheDocument();
  });

  test("submits selected skill and mastery", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    render(
      <SkillDialog
        open={true}
        onOpenChange={jest.fn()}
        mode="add"
        allSkills={allSkills}
        userSkills={[]}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByDisplayValue("Select skill"), {
      target: { value: "Vue" },
    });
    fireEvent.change(screen.getByDisplayValue("Select mastery"), {
      target: { value: "Proficient" },
    });

    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Vue",
        categoryId: "cat-2",
        mastery: "Proficient",
      });
    });
  });
});
