import { useCreateCv } from "@/features/cvs/api/createCv";
import { useDeleteCv } from "@/features/cvs/api/deleteCv";
import { useUpdateCv } from "@/features/cvs/api/updateCv";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";

export const useCvsActions = () => {
  const [createCv] = useCreateCv();
  const [deleteCv] = useDeleteCv();
  const [updateCv] = useUpdateCv();
  const currUserId = getUserIdFromToken();

  const handleCreateCv = async (input: {
    name: string,
    description: string,
    education?: string,
  }) => {
    await createCv({
      variables: {
        cv: {
          ...input,
          userId: String(currUserId),
        },
      },
      refetchQueries: ["GetCvs"],
    });
  };

  const handleDelete = (id: string) => {
    deleteCv({
      variables: { cv: { cvId: id } },
      refetchQueries: ["GetCvs"],
    });
  };

  const handleUpdateCv = async (input: {
    cvId: string;
    name: string;
    description: string;
    education?: string;
  }) => {
    await updateCv({
      variables: {
        cv: input,
      },
      refetchQueries: ["GetCv"],
    });
  };

  return { handleCreateCv, handleDelete, handleUpdateCv };
};
