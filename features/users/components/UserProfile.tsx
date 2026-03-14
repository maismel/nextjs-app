"use client";

import { Preloader } from "@/components/ui/Preloader";
import { useGetUser } from "@/features/users/api/getUser";
import { useGetDepartments } from "@/features/users/api/getDepartments";
import { useGetPositions } from "@/features/users/api/getPositions";
import { useUpdateProfile } from "@/features/users/api/updateProfile";
import { useUpdateUser } from "@/features/users/api/updateUser";
import { useUploadAvatar } from "@/features/users/api/useUploadAvatar";
import { fileToBase64 } from "@/helpers/fileToBase64";
import {
  UserProfileForm,
  UserProfileFormState,
} from "@/features/users/components/UserProfileForm";
import {
  getUserIdFromToken,
  getUserRoleFromToken,
} from "@/helpers/getUserIdFromToken";

export const UserProfile = ({ userId }: { userId: string }) => {
  const userQ = useGetUser(userId);
  const depsQ = useGetDepartments();
  const posQ = useGetPositions();

  const [uploadAvatar, uploadAvatarState] = useUploadAvatar();
  const onUploadAvatar = async (file: File) => {
    if (file.size > 0.5 * 1024 * 1024) {
      alert("File is too large. Max 0.5MB");
      return;
    }

    const base64 = await fileToBase64(file);

    await uploadAvatar({
      variables: {
        avatar: {
          userId,
          base64,
          size: file.size,
          type: file.type,
        },
      },
    });

    await userQ.refetch();
  };

  const [updateProfile, updProfState] = useUpdateProfile();
  const [updateUser, updUserState] = useUpdateUser();

  const currentUserId = getUserIdFromToken(); // number | null
  const currentUserRole = getUserRoleFromToken(); // string | null

  const isowner = currentUserId !== null && currentUserId.toString() === userId;
  const isadmin = currentUserRole === "Admin";

  const loading = userQ.loading || depsQ.loading || posQ.loading;
  const error = userQ.error || depsQ.error || posQ.error;

  if (error) return <div className="p-6 text-destructive">{error.message}</div>;

  const user = userQ.data?.user;
  if (!user) return <div className="p-6">User not found</div>;

  const readOnly = !(isowner || isadmin);

  const initialValues: UserProfileFormState = {
    first_name: user.profile?.first_name ?? "",
    last_name: user.profile?.last_name ?? "",
    departmentId: user.department?.id ?? "",
    positionId: user.position?.id ?? "",
  };

  const onSubmit = async (values: UserProfileFormState) => {
    const profileChanged =
      values.first_name !== initialValues.first_name ||
      values.last_name !== initialValues.last_name;

    const userChanged =
      values.departmentId !== initialValues.departmentId ||
      values.positionId !== initialValues.positionId;

    if (profileChanged) {
      await updateProfile({
        variables: {
          profile: {
            userId,
            first_name: values.first_name,
            last_name: values.last_name,
          },
        },
      });
    }

    if (userChanged) {
      await updateUser({
        variables: {
          user: {
            userId,
            departmentId: values.departmentId || null,
            positionId: values.positionId || null,
          },
        },
      });
    }

    await userQ.refetch();
  };

  return (
    <>
      <Preloader loading={loading} />
      <UserProfileForm
        userEmail={user.email}
        avatar={user.profile?.avatar ?? null}
        fullName={user.profile?.full_name ?? ""}
        createdAt={user.created_at}
        departments={depsQ.data?.departments ?? []}
        positions={posQ.data?.positions ?? []}
        initialValues={initialValues}
        readOnly={readOnly}
        loading={
          updProfState.loading ||
          updUserState.loading ||
          uploadAvatarState.loading
        }
        onSubmit={onSubmit}
        onUploadAvatar={onUploadAvatar}
      />
    </>
  );
};
