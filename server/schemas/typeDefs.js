const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type ProductSchema {
    _id: ID
    name: String
    description: String
    price: Float
  }

  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    products: [ProductSchema]!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    product(productId: ID!): ProductSchema
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addProduct(profileId: ID!, product: Product): Profile
    removeProfile: Profile
    removeProduct(productId: ID!): Profile
  }

  input Product {
    name: String
    description: String
    price: Float
  }
`;

module.exports = typeDefs;
