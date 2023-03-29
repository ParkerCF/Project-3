import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($productId: ID!) {
    removeProduct(productId: $productId) {
      _id
      name
      products {
        name
        description
        price
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($profileId: ID!, $product: Product) {
    addProduct(profileId: $profileId, product: $product) {
      _id
      name
      products {
        name
        description
        price
      }
    }
  }
`;
