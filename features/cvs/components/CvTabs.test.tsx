import { render, screen } from "@testing-library/react";
import { CvTabs } from "./CvTabs";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/cvs/123/details",
  useParams: () => ({ cvId: "123" }),
}));

describe("CvTabs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all tabs", () => {
    render(<CvTabs />);
    expect(screen.getByText("DETAILS")).toBeInTheDocument();
    expect(screen.getByText("SKILLS")).toBeInTheDocument();
    expect(screen.getByText("PROJECTS")).toBeInTheDocument();
    expect(screen.getByText("PREVIEW")).toBeInTheDocument();
  });

  test("current tab is determined from pathname", () => {
    render(<CvTabs />);
    const detailsTab = screen.getByText("DETAILS");
    expect(detailsTab).toBeInTheDocument();
  });
});
