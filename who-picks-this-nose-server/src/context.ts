import { GoogleAPI } from "./datasources/google-api";

export type DataSourceContext = {
  dataSources: { googleApi: GoogleAPI };
};
