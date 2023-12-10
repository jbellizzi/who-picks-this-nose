import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { PORT } from "./constants";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, { listen: { port: PORT } });

  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
