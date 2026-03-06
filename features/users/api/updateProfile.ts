import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
      full_name
      avatar
    }
  }
`;

export const useUpdateProfile = () => useMutation(UPDATE_PROFILE);
