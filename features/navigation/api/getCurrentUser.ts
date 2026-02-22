import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react/compiled";

interface GetCurrentUserArgs {
  userId: string;
}

interface GetCurrentUserResult {
  currentUser: {
    profile: {
      full_name: string;
      avatar: string;
    };
  };
}

export const GET_CURRENT_USER = gql`
  query GetCurrentUser($userId: ID!) {
    user(userId: $userId) {
      profile {
        full_name
        avatar
      }
    }
  }
`;

export const useGetCurrentUser = (userId?: string) => {
  return useQuery<GetCurrentUserResult, GetCurrentUserArgs>(GET_CURRENT_USER, {
    variables: { userId: userId! },
    skip: !userId,
  });
};
