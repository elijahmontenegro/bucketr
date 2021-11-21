import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation signup($data: UserCreateInput!) {
    signup(data: $data) {
      id
      displayName
      email
      password
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        displayName
        email
      }
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

const CREATE_WORKSPACE = gql`
  mutation createWorkspace($data: WorkspaceCreateInput!) {
    createWorkspace(data: $data) {
      id
      name
    }
  }
`;

const DELETE_WORKSPACE = gql`
  mutation deleteWorkspace($id: ID!) {
    deleteWorkspace(id: $id)
  }
`;

const UPDATE_WORKSPACE = gql`
  mutation updateWorkspace($data: WorkspaceUpdateInput!) {
    updateWorkspace(data: $data)
  }
`;

const CREATE_USER = gql`
  mutation createUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      displayName
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($data: UserUpdateInput!) {
    updateUser(data: $data)
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  CREATE_WORKSPACE,
  DELETE_WORKSPACE,
  UPDATE_WORKSPACE,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
};