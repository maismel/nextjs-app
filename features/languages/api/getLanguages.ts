import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Language } from "cv-graphql";

interface GetLanguagesResp {
  languages: Language[];
}

const GET_LANGUAGES = gql`
    query GetLanguages {
        languages {
            id
            iso2
            name
            native_name
        }
    }
`;

export const useGetLanguages = () => {
  return useQuery<GetLanguagesResp>(GET_LANGUAGES);
};
