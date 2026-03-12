import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LanguageDialog } from "./LanguageDialog";

describe("LanguageDialog", () => {
  const allLanguages = [{ name: "English" }, { name: "German" }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("filters already used languages in add mode", () => {
    render(
      <LanguageDialog
        open={true}
        onOpenChange={jest.fn()}
        mode="add"
        allLanguages={allLanguages}
        userLanguages={[{ name: "English" }]}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByRole("option", { name: "German" })).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: "English" }),
    ).not.toBeInTheDocument();
  });

  test("submits selected language and proficiency", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    render(
      <LanguageDialog
        open={true}
        onOpenChange={jest.fn()}
        mode="add"
        allLanguages={allLanguages}
        userLanguages={[]}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByDisplayValue("Select language"), {
      target: { value: "English" },
    });
    fireEvent.change(screen.getByDisplayValue("Select proficiency"), {
      target: { value: "C1" },
    });

    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: "English",
        proficiency: "C1",
      });
    });
  });
});
