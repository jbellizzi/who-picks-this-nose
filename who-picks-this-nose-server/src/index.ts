import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server);
  // const { url } = await startStandaloneServer(server, {
  //   context: async () => {
  //     const { cache } = server;
  //     return { dataSources: {} };
  //   },
  // });

  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
