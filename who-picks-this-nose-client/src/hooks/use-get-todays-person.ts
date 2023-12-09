import { useQuery } from "@apollo/client";

import { gql } from "../__generated__";

const GET_TODAYS_PERSON = gql(`
  query GetTodaysPerson {
    todaysPerson {
      id
      name
      noseUrl
      faceUrl
    }
  }
`);

export const useGetTodaysPerson = () => {
  const { loading, error, data } = useQuery(GET_TODAYS_PERSON);

  return { loadingTodaysPerson: loading, errorTodaysPerson: error, todaysPerson: data?.todaysPerson };
};
