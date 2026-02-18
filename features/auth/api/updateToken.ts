import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { UpdateTokenResult } from "cv-graphql";

type UpdateTokenArgs = {
  updateToken: UpdateTokenResult;
};


export const UPDATE_TOKEN = gql`
  mutation UpdateToken {
    updateToken() {
      access_token
      refresh_token
    }
  }
`;

export const useUpdateToken = () => {
  return useMutation<UpdateTokenArgs>(UPDATE_TOKEN);
}
