import React from 'react';
import Router from './routing';
import { ApolloProvider } from '@apollo/client';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as StyletronEngine } from "styletron-engine-atomic";
import { StyleReset, ThemeProvider } from 'atomize';
import { appTheme } from './constants';
import { apolloClient } from './services';

const engine = new StyletronEngine();

// This breaks everything.
// const debug = process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

const App = () => {

  return (
    <StyletronProvider value={engine} /* debug={debug} debugAfterHydration */ >
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={appTheme}>
          <StyleReset />
          <Router />
        </ThemeProvider>
      </ApolloProvider>
    </StyletronProvider>
  );
};

export default App;