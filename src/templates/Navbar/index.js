import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import logo from '../../../assets/hippo.face_black.png';

export default function Navbar(props) {
  return (
      <div className="navbar">
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
        >

          <h1 className=""><img className="navbar__logo" src={logo} alt="Hippocrypto logo" />{props.siteTitle}</h1>{' '}
        </Link>
      </div>
  );
}

Navbar.propTypes = {
  siteTitle: PropTypes.string
};
