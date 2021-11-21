import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getSessionToken } from '#helpers';
import Store, { typeDefs, typePolicies } from './Store';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000',
  options: {
    reconnect: true
  }
});

const httpLink = HttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = Store.isLoggedIn() ? getSessionToken() : false;

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

const wwwLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind == "OperationDefinition" &&
      definition.operation == 'subscription'
    );
  },
  wsLink,
  httpLink
)

const cache = new InMemoryCache({ typePolicies });

// cache.writeData to prep defaults
// cache.onStoreReset -> prep defaults

export default new ApolloClient({
  connectToDevTools: process.env.NODE_ENFV,
  link: ApolloLink.from([
    authLink, 
    errorLink, 
    wwwLink
  ]),
  cache,
  typeDefs
});