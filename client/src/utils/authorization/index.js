import React, { useEffect } from 'react';
import { Redirect } from 'react-resource-router';
import { IS_LOGGED_IN } from '../../services/graphql/queries';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Cookies from 'js-cookie';
import { graphql } from '@apollo/client/react/hoc';

//  Method
//
// Get Session Cookie
export const getSessionToken = () => Cookies.get('sid');

//  HOC
//
// WithAuth Route Protection
export const withAuth = (options) => WrappedComponent => {
  const ProtectedComponent = (props) => {
    if (!props.data.isLoggedIn) 
      return <Redirect to={options.redirectTo || "/unauthorized"} />;

    return <WrappedComponent {...props} />;
  };

  hoistNonReactStatics(ProtectedComponent, WrappedComponent);

  return graphql(IS_LOGGED_IN)(ProtectedComponent);
};