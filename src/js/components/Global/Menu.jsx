import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'config/routes';

export default class Menu extends Component {
  render() {
    return (
      <div className='menu'>
        <div className='menu__link'>
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
