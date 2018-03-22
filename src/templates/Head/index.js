import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default function Head(props) {
  return (
    <Helmet title={props.title}>
      <meta name="keywords" content="cryptocurrency, ethereum, erc20, metamask, bitcoin" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.siteDescription} />
      <meta property="og:image" content={props.siteImage} />
      <meta property="og:url" content={props.url} />
      <meta property="og:site_name" content={props.siteTitle} />
      <meta property="og:type" content="website" />

      <meta name="twitter:creator" content="@theHippocrypto" />
      <meta name="twitter:site" content="@theHippocrypto" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.siteDescription} />
    </Helmet>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  siteDescription: PropTypes.string.isRequired,
  siteImage: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
