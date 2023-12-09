import gql from "graphql-tag";

export const typeDefs = gql`
  "A person whose nose to pick"
  type Person {
    "Person's ID"
    id: ID!
    "Person's name"
    name: String!
  }

  "Image"
  type PersonWithImage {
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
