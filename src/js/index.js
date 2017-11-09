import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'views/App';

import store from 'config/store';

import '../scss/index.scss';

const importAll = (r) => {
  return r.keys().map(r);
};

/**
 * Import all images for webpack loaders to process
 */
importAll(require.context('../img', false, /\.(png|jpg|jpe?g|gif|svg)$/));

const render = (Component) => {
  ReactDOM.render(
    <Provider store={ store }>
      <Router>
        <Component />
      </Router>
    </Provider>,
    document.getElementById('app')
  );
};

render(App);
