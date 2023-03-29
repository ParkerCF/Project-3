import { gql } from "@apollo/client";

// queries all profiles
export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      products {
        _id
        name
        description
        price
      }
    }
  }
`;

// queries single profile
export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      email
      products {
        _id
        name
        description
        price
      }
    }
  }
`;

// queries logged in user
export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      products {
        _id
        name
        description
        price
      }
    }
  }
`;

// queries single product
export const QUERY_SINGLE_PRODUCT = gql`
  query product($productId: ID!) {
    product(productId: $productId) {
      _id
      name
      description
      price
    }
  }
`;
