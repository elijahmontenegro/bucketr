import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

const GET_CURRENT_WORKSPACE = gql`
  query currentWorkspace {
    currentWorkspace @client
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

const GET_USERS = gql`
  query {
    users {
      id
      displayName
      email
      role 
      active
    }
  }
`;

const GET_WORKSPACES = gql`
  query {
    workspaces {
      id
      name
      shortName
      boards {
        id
        name
      }
    }
  }
`;

export {
  GET_CURRENT_WORKSPACE,
  ME_QUERY,
  IS_LOGGED_IN,
  GET_USERS,
  GET_WORKSPACES
}   