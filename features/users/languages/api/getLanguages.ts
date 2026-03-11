import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export type Language = {
  id: string;
  name: string;
};

export type GetLanguagesData = {
  languages: Language[];
};

export const GET_LANGUAGES = gql`
  query GetLanguages {
    languages {
      id
      name
    }
  }
`;

export const useGetLanguages = () => useQuery<GetLanguagesData>(GET_LANGUAGES);
