import React from 'react';
import { Router as ResourceRouter, RouteComponent } from 'react-resource-router';
import { createBrowserHistory } from 'history';
import { createRoutes } from './routes';
import { Layout, Header, Main, Footer } from '../components/persistent';

const history = createBrowserHistory();

// disable transitions on page load
history.listen(location => {
  document.body.className = "preload-transitions";

  setTimeout(() => {
    document.body.className = "";
  }, 500);
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.body.className = ""
  }, 500);
});

const routes = createRoutes();

const Router = (props) => {
  return (
    <ResourceRouter routes={routes} history={history}>
      <Layout>
        <Header />
        <Main>
          <RouteComponent />
        </Main>
        {/* <Footer /> */}
      </Layout>
    </ResourceRouter>
  );
};

export default Router;
//TODO: each project gets b/project name like redditw