import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { PORT, googleCredentials } from "./constants";
import { GoogleAPI } from "./datasources/google-api";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return { dataSources: { googleApi: new GoogleAPI({ credentials: googleCredentials, cache }) } };
    },
    listen: { port: PORT },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
