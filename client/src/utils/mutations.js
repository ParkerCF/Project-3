import { gql } from "@apollo/client";

// adds profile to database
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

// logs in user
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

// removes profile from database
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

// adds product to profile
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

// update product
export const UPDATE_PRODUCT = gql`
  mutation updateProduct($profileId: ID!,$name:String!, $product: Product) {
    updateProduct(profileId: $profileId,name:$name ,product: $product) {
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
