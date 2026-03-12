import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserSkills } from "./UserSkills";

const mockAddSkill = jest.fn();
const mockUpdateSkill = jest.fn();
const mockDeleteSkill = jest.fn();
const mockRefetch = jest.fn();
const renderSkillsUI = jest.fn();
const renderSkillDialog = jest.fn();

jest.mock("@/helpers/getUserIdFromToken", () => ({
  getUserIdFromToken: jest.fn(),
}));
jest.mock("../api/getProfileSkills", () => ({
  useGetProfileSkills: jest.fn(),
}));
jest.mock("../api/getSkills", () => ({
  useGetSkills: jest.fn(),
}));
jest.mock("../api/getSkillCategories", () => ({
  useGetSkillCategories: jest.fn(),
}));
jest.mock("../api/addProfileSkill", () => ({
  useAddProfileSkill: jest.fn(),
}));
jest.mock("../api/updateProfileSkill", () => ({
  useUpdateProfileSkill: jest.fn(),
}));
jest.mock("../api/deleteProfileSkill", () => ({
  useDeleteProfileSkill: jest.fn(),
}));
jest.mock("@/components/ui/Preloader", () => ({
  Preloader: () => <div>Loading...</div>,
}));
jest.mock("./UserSkillsUI", () => ({
  UserSkillsUI: (props: {
    groupedSkills: unknown[];
    onAdd: () => void;
    onUpdate: (skill: { name: string; categoryId?: string | null; mastery: string }) => void;
    onDelete: (name: string) => void;
  }) => {
    renderSkillsUI(props);
    return (
      <div>
        <button onClick={props.onAdd}>open-add</button>
        <button
          onClick={() =>
            props.onUpdate({ name: "React", categoryId: "1", mastery: "Expert" })
          }
        >
          open-update
        </button>
        <button onClick={() => props.onDelete("React")}>delete-skill</button>
      </div>
    );
  },
}));
jest.mock("./SkillsDialog", () => ({
  SkillDialog: (props: {
    open: boolean;
    mode: "add" | "update";
    onSubmit: (values: {
      name: string;
      categoryId?: string | null;
      mastery: string;
    }) => Promise<void>;
  }) => {
    renderSkillDialog(props);
    return props.open ? (
      <button
        onClick={() =>
          props.onSubmit({
            name: "Vue",
            categoryId: "2",
            mastery: "Proficient",
          })
        }
      >
        submit-skill-dialog
      </button>
    ) : null;
  },
}));

const { getUserIdFromToken } = jest.requireMock("@/helpers/getUserIdFromToken") as {
  getUserIdFromToken: jest.Mock;
};
const { useGetProfileSkills } = jest.requireMock("../api/getProfileSkills") as {
  useGetProfileSkills: jest.Mock;
};
const { useGetSkills } = jest.requireMock("../api/getSkills") as {
  useGetSkills: jest.Mock;
};
const { useGetSkillCategories } = jest.requireMock("../api/getSkillCategories") as {
  useGetSkillCategories: jest.Mock;
};
const { useAddProfileSkill } = jest.requireMock("../api/addProfileSkill") as {
  useAddProfileSkill: jest.Mock;
};
const { useUpdateProfileSkill } = jest.requireMock("../api/updateProfileSkill") as {
  useUpdateProfileSkill: jest.Mock;
};
const { useDeleteProfileSkill } = jest.requireMock("../api/deleteProfileSkill") as {
  useDeleteProfileSkill: jest.Mock;
};

describe("UserSkills", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    getUserIdFromToken.mockReturnValue("123");
    useGetProfileSkills.mockReturnValue({
      data: {
        profile: {
          skills: [{ name: "React", categoryId: "1", mastery: "Expert" }],
        },
      },
      loading: false,
      refetch: mockRefetch,
    });
    useGetSkills.mockReturnValue({
      data: {
        skills: [{ id: "1", name: "React" }, { id: "2", name: "Vue" }],
      },
      loading: false,
    });
    useGetSkillCategories.mockReturnValue({
      data: {
        skillCategories: [
          { id: "1", name: "Frontend" },
          { id: "2", name: "Backend" },
        ],
      },
      loading: false,
    });
    useAddProfileSkill.mockReturnValue([mockAddSkill]);
    useUpdateProfileSkill.mockReturnValue([mockUpdateSkill]);
    useDeleteProfileSkill.mockReturnValue([mockDeleteSkill]);
    mockAddSkill.mockResolvedValue({});
    mockUpdateSkill.mockResolvedValue({});
    mockDeleteSkill.mockResolvedValue({});
    mockRefetch.mockResolvedValue({});
  });

  test("renders preloader while one of queries is loading", () => {
    useGetSkills.mockReturnValue({
      data: null,
      loading: true,
    });

    render(<UserSkills userId="123" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("passes grouped skills to UI", () => {
    render(<UserSkills userId="123" />);

    expect(renderSkillsUI).toHaveBeenCalledWith(
      expect.objectContaining({
        groupedSkills: [
          {
            categoryName: "Frontend",
            skills: [{ name: "React", categoryId: "1", mastery: "Expert" }],
          },
        ],
      }),
    );
  });

  test("adds a profile skill through dialog submit", async () => {
    render(<UserSkills userId="123" />);

    fireEvent.click(screen.getByText("open-add"));
    fireEvent.click(screen.getByText("submit-skill-dialog"));

    await waitFor(() => {
      expect(mockAddSkill).toHaveBeenCalledWith({
        variables: {
          userId: "123",
          name: "Vue",
          categoryId: "2",
          mastery: "Proficient",
        },
      });
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  test("updates a profile skill through dialog submit", async () => {
    render(<UserSkills userId="123" />);

    fireEvent.click(screen.getByText("open-update"));
    fireEvent.click(screen.getByText("submit-skill-dialog"));

    await waitFor(() => {
      expect(mockUpdateSkill).toHaveBeenCalledWith({
        variables: {
          userId: "123",
          name: "Vue",
          categoryId: "2",
          mastery: "Proficient",
        },
      });
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  test("deletes a profile skill and refetches", async () => {
    render(<UserSkills userId="123" />);

    fireEvent.click(screen.getByText("delete-skill"));

    await waitFor(() => {
      expect(mockDeleteSkill).toHaveBeenCalledWith({
        variables: {
          userId: "123",
          name: ["React"],
        },
      });
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});
