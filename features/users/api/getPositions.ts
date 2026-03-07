import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export type Position = { id: string; name: string };
export type GetPositionsData = { positions: Position[] };

export const GET_POSITIONS = gql`
  query GetPositions {
    positions {
      id
      name
    }
  }
`;

export const useGetPositions = () => useQuery<GetPositionsData>(GET_POSITIONS);
