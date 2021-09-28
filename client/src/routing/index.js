import React from 'react';
import { Router as ResourceRouter, RouteComponent } from 'react-resource-router';
import { createBrowserHistory } from 'history';
import { createRoutes } from './routes';
import { Layout, Header, Content, Footer } from '../components/persistent';

const history = createBrowserHistory();
const routes = createRoutes();

const Router = (props) => {
  return (
    <ResourceRouter routes={routes} history={history}>
      <Layout>
        <Header />
        <Content>
          <RouteComponent />
        </Content>
        <Footer />
      </Layout>
    </ResourceRouter>
  );
};

export default Router;