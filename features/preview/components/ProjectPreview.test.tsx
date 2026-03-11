import { render, screen } from "@testing-library/react";
import { ProjectPreview } from "./ProjectPreview";

jest.mock("@/features/preview/components/InfoBlock", () => ({
  InfoBlock: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  ),
}));

describe("ProjectPreview", () => {
  const project = {
    name: "Website Redesign",
    description: "Redesign corporate website",
    roles: ["Frontend", "Backend"],
    start_date: "2022-01",
    end_date: undefined,
    responsibilities: ["Design UI", "Implement API", "Test features"],
    environment: ["React", "Node.js", "PostgreSQL"],
  };

  test("renders project info correctly", () => {
    render(<ProjectPreview project={project} />);

    expect(screen.getByText("WEBSITE REDESIGN")).toBeInTheDocument();
    expect(screen.getByText("Redesign corporate website")).toBeInTheDocument();

    expect(screen.getByText("Project Roles")).toBeInTheDocument();
    expect(screen.getByText("Frontend, Backend")).toBeInTheDocument();

    expect(screen.getByText("Period")).toBeInTheDocument();
    expect(screen.getByText("2022-01 - Till now")).toBeInTheDocument();

    expect(screen.getByText("Responsibilities")).toBeInTheDocument();
    expect(screen.getByText("Design UI")).toBeInTheDocument();
    expect(screen.getByText("Implement API")).toBeInTheDocument();
    expect(screen.getByText("Test features")).toBeInTheDocument();

    expect(screen.getByText("Environment")).toBeInTheDocument();
    expect(screen.getByText("React, Node.js, PostgreSQL")).toBeInTheDocument();
  });

  test("renders with different end_date", () => {
    const projectWithEnd = { ...project, end_date: "2022-12" };
    render(<ProjectPreview project={projectWithEnd} />);

    expect(screen.getByText("2022-01 - 2022-12")).toBeInTheDocument();
  });
});
