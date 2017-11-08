import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'views/Dashboard';
import Statistics from 'views/Statistics';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
  STATISTICS: `${ publicPath }statistics`,
};

const Routes = () => (
  <Switch>
    <Route exact path={ publicPath } component={ Dashboard } />
    <Route path={ routeCodes.STATISTICS } component={ Statistics } />
    <Route path='*' component={ NotFound } />
  </Switch>
);

export default Routes;
