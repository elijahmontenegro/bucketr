export { typeDefs } from './typeDefs';

import { InMemoryCache, Reference, makeVar } from '@apollo/client';
import { getSessionToken } from '../../../utils/authorization';

export const isLoggedInVar = makeVar(getSessionToken() !== undefined);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        }
      }
    }
  }
});