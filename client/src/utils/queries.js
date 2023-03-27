import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
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

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      email
      products {
        name
        description
        price
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      products {
        name
        description
        price
      }
    }
  }
`;
