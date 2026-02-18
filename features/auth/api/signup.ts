import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type { AuthInput, AuthResult } from "cv-graphql";

export type SignupArgs = {
  auth: AuthInput;
};

export type SignupResult = {
  signup: AuthResult;
};

export const SIGNUP = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
      }
      access_token
      refresh_token
    }
  }
`;

export const useSignup = () => {
  return useMutation<SignupResult, SignupArgs>(SIGNUP);
};
