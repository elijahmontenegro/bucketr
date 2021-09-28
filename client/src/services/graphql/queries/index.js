import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

const ME_QUERY = gql`
  query {
    me {
      id
      displayName
      email
    }
  }
`;

export {
  ME_QUERY,
  IS_LOGGED_IN
}   