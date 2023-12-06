import gql from "graphql-tag";

export const typeDefs = gql`
  "A person whose nose to pick"
  type Person {
    "Person's ID"
    id: ID!
    "Person's name"
    name: String!
  }

  "A nose to display"
  type Nose {
    "Nose's ID"
    id: ID!
    "ID of person's nose"
    personId: ID!
    "URL of the nose image"
    noseUrl: String!
    "URL of the face image"
    faceUrl: String!
  }

  "Image"
  type Image {
    "Image's ID"
    id: ID!
  }

  type Query {
    "Get all people"
    people: [Person!]!
  }
`;
