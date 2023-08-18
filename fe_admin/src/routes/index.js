import React from 'react';
import { Switch, Route } from 'react-router-dom';

//routes
import { authProtectedRoutes, publicRoutes } from './allRoutes';
import { AuthProtected, AccessRoute } from './AuthProtected';
import MainLayout from 'core/layout/MainLayout/index';
import MinimalLayout from 'core/layout/MinimalLayout/index';

const Index = () => {
  const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
  const availableAuthRoutesPath = authProtectedRoutes.map((r) => r.path);
  return (
    <React.Fragment>
      <Switch>
        <Route path={availablePublicRoutesPaths}>
          <MinimalLayout>
            <Switch>
              {publicRoutes.map((route, idx) => (
                <Route path={route.path} component={route.component} key={idx} exact={true} />
              ))}
            </Switch>
          </MinimalLayout>
        </Route>
        <MainLayout>
          <Route path={availableAuthRoutesPath}>
            <AuthProtected>
              <Switch>
                {authProtectedRoutes.map((route, idx) => (
                  <AccessRoute path={route.path} component={route.component} key={idx} exact={true} />
                ))}
              </Switch>
            </AuthProtected>
          </Route>
        </MainLayout>
      </Switch>
    </React.Fragment>
  );
};

export default Index;
