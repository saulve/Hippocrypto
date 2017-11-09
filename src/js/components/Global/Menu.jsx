import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'config/routes';

export default class Menu extends Component {
  render() {
    return (
      <div className='menu'>
        <div className='menu__logo'>
          <span> HIPPOCRYPTO </span>
        </div>
        <div className='menu__link_container'>
          <NavLink
            activeClassName='menu__link--active'
            className='menu__link'
            exact
            to={ routeCodes.DASHBOARD }
          >
            Home
          </NavLink>
          <NavLink
            activeClassName='menu__link--active'
            className='menu__link'
            to={ routeCodes.STATISTICS }
          >
            Statistics
          </NavLink>
          <NavLink
            activeClassName='menu__link--active'
            className='menu__link'
            to='/404'
          >
            404
          </NavLink>
        </div>
      </div>
    );
  }
}
