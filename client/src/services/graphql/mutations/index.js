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

export {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  LOGOUT_MUTATION
};