import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { cache, typeDefs } from './cache';
import { getSessionToken } from '../../utils/authorization';

const httpLink = HttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  const token = getSessionToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const signedIn = !graphQLErrors.some(
      err => (err.message === 'Not Authorised!' || err.message === 'NOT_AUTHORIZED'),
    );

    if (signedIn && !networkError) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
  }
});

const config = {
  connectToDevTools: process.env.NODE_ENV !== "production",
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache,
  // resolvers,
  typeDefs
};

const client = new ApolloClient(config);

export default client;

export {
  authLink as ctx
}
