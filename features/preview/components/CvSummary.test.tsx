import { render, screen } from "@testing-library/react";
import { CvSummary } from "./CvSummary";

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
      {children}
    </div>
  ),
}));

describe("CvSummary", () => {
  const props = {
    name: "John Doe",
    description: "Experienced developer",
    education: "MIT",
  };

  test("renders name, description, and education", () => {
    render(<CvSummary {...props} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Experienced developer")).toBeInTheDocument();
    expect(screen.getByText("MIT")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument(); // Language Proficiency placeholder
  });

  test("renders without crashing if props are missing", () => {
    render(<CvSummary />);

    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
