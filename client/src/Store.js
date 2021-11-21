import { makeVar } from "@apollo/client";
import gql from "graphql-tag";
import { getSessionToken } from "#helpers";
import Cookies from 'js-cookie';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    currentWorkspace: String!
  }
`;

const Store = {
  isLoggedIn: makeVar(!!Cookies.get('sid')),
  currentWorkspace: makeVar(localStorage.getItem('currentWorkspace')),
};

const typePolicies = {
  Query: {
    fields: { 
      isLoggedIn: {
        read() {
          return Store.isLoggedIn();
        }
      },
      currentWorkspace: {
        read() {
          return Store.currentWorkspace();
        }
      }
    }
  }
};

export {
  Store as default,
  typeDefs,
  typePolicies
};