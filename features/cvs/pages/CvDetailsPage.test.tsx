import { render, screen, fireEvent } from "@testing-library/react";
import { CvDetailsPage } from "./CvDetailsPage";
import { CvFormState } from "@/features/cvs/components/CvForm";

const mockHandleUpdateCv = jest.fn();

jest.mock("next/navigation", () => ({
  useParams: () => ({ cvId: "123" }),
}));

jest.mock("@/features/cvs/hooks/useCvsActions", () => ({
  useCvsActions: () => ({ handleUpdateCv: mockHandleUpdateCv }),
}));

jest.mock("@/features/cvs/api/getCvById", () => ({
  useGetCvById: jest.fn(() => ({
    data: { cv: { name: "Alice", education: "BSc", description: "Frontend" } },
    loading: false,
  })),
}));

jest.mock("@/components/ui/Preloader", () => ({
  Preloader: () => <div>Loading...</div>,
}));

jest.mock("@/features/cvs/components/CvForm", () => ({
  CvForm: ({
    initialValues,
    onSubmit,
  }: {
    initialValues: CvFormState;
    onSubmit: (values: CvFormState) => void;
  }) => (
    <div>
      <input value={initialValues.name} readOnly />
      <input value={initialValues.education} readOnly />
      <textarea value={initialValues.description} readOnly />
      <button onClick={() => onSubmit(initialValues)}>Submit</button>
    </div>
  ),
}));

describe("CvDetailsPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("renders CvForm with initial values", () => {
    render(<CvDetailsPage />);
    expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();
    expect(screen.getByDisplayValue("BSc")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Frontend")).toBeInTheDocument();
  });

  test("calls handleUpdateCv on form submit", () => {
    render(<CvDetailsPage />);
    fireEvent.click(screen.getByText("Submit"));

    expect(mockHandleUpdateCv).toHaveBeenCalledWith({
      cvId: "123",
      name: "Alice",
      education: "BSc",
      description: "Frontend",
    });
  });
});
