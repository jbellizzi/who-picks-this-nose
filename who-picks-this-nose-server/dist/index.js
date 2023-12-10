"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const constants_1 = require("./constants");
const resolvers_1 = require("./resolvers");
const schema_1 = require("./schema");
async function startApolloServer() {
    const server = new server_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: resolvers_1.resolvers });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, { listen: { port: constants_1.PORT } });
    console.log(`🚀 Server ready at ${url}`);
}
startApolloServer();
