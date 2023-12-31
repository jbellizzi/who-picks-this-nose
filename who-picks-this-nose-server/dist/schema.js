"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.typeDefs = (0, graphql_tag_1.default) `
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  "A person whose nose to pick"
  type Person {
    "Person's ID"
    id: ID!
    "Person's name"
    name: String!
  }

  "Image"
  type PersonWithImage @cacheControl(maxAge: 240) {
    "Image ID"
    id: ID!
    "Name"
    name: String!
    "Nose Image URL"
    noseUrl: String!
    "Face Image URL"
    faceUrl: String!
  }

  type Query {
    "Get all people"
    people: [Person!]!
    "Get today's person"
    todaysPerson: PersonWithImage!
  }
`;
