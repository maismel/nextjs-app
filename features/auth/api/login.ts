import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import type { AuthInput, AuthResult } from "cv-graphql";

export type LoginArgs = {
  auth: AuthInput;
};

export type LoginResult = {
  login: AuthResult;
};

export const LOGIN = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
      }
      access_token
      refresh_token
    }
  }
`;

export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN);
};
