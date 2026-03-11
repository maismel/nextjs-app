import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CvsList } from "./CvsList";

const mockPush = jest.fn();
const mockHandleDelete = jest.fn();
const mockSetSearch = jest.fn();
const mockHandleSort = jest.fn();

jest.mock("@/features/cvs/api/getCvs", () => ({
  useGetCvs: jest.fn(() => ({
    data: {
      cvs: [
        {
          id: "1",
          name: "Alice",
          description: "Desc",
          education: "High",
          user: { email: "alice@test.com" },
        },
      ],
    },
    loading: false,
  })),
}));

jest.mock("@/features/cvs/hooks/useCvsActions", () => ({
  useCvsActions: jest.fn(() => ({ handleDelete: mockHandleDelete })),
}));

jest.mock("@/hooks/useSortTable", () => ({
  useSortTable: jest.fn((data) => ({
    processedData: data,
    search: "",
    setSearch: mockSetSearch,
    handleSort: mockHandleSort,
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("CvsList", () => {
  beforeEach(() => jest.clearAllMocks());

  test("renders table and toolbar", () => {
    render(<CvsList />);
    expect(screen.getByText("CREATE CV")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("alice@test.com")).toBeInTheDocument();
  });

  test("opens CreateCvDialog when CREATE CV is clicked", async () => {
    render(<CvsList />);
    fireEvent.click(screen.getByText("CREATE CV"));

    expect(await screen.findByText("Create CV")).toBeInTheDocument();
  });
});
