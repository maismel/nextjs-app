import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CvHeader } from "./CvHeader";

describe("CvHeader", () => {
  const user = {
    profile: { full_name: "John" },
    position_name: "Developer",
  };

  test("renders user name and position", () => {
    render(<CvHeader user={user} />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });

  test("calls onExport when button is clicked", () => {
    const onExportMock = jest.fn();
    render(<CvHeader user={user} onExport={onExportMock} />);

    const button = screen.getByText("EXPORT PDF");
    fireEvent.click(button);

    expect(onExportMock).toHaveBeenCalledTimes(1);
  });
});
