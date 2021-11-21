import React from 'react';
import { Redirect } from 'react-resource-router';
import { IS_LOGGED_IN, ME_QUERY } from '../../graphql/queries';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { graphql } from '@apollo/client/react/hoc';
import Store from '#store';

const withAuth = (options) => WrappedComponent => {
  const ProtectedComponent = (props) => {
    if (!Store.isLoggedIn()) {
      return <Redirect to={options.redirectTo || "/unauthorized"} />;
    }

    return <WrappedComponent {...props} />;
  };

  hoistNonReactStatics(ProtectedComponent, WrappedComponent);

  return ProtectedComponent;
};

export default withAuth;