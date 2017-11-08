import React, { Component } from 'react';
import Routes from 'config/routes';
import Menu from 'components/Global/Menu';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Menu />

        <div className='page'>
          <Routes />
        </div>
      </div>
    );
  }
}

