import { useQuery } from "@apollo/client";

import { gql } from "../__generated__";

const GET_PEOPLE = gql(`
  query GetPeople {
    people {
      id
      name
    }
  }
`);

export const useGetPeople = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);
  return { loadingPeople: loading, errorPeople: error, people: data?.people };
};
