import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;

type UploadAvatarVars = {
  avatar: {
    userId: string;
    base64: string;
    size: number;
    type: string;
  };
};

type UploadAvatarData = {
  uploadAvatar: string;
};

export const useUploadAvatar = () =>
  useMutation<UploadAvatarData, UploadAvatarVars>(UPLOAD_AVATAR);
