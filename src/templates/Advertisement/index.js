import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function Advertisement(props) {
	const { hideAds, className } = props;

	if (hideAds || hideAds === null) {
      return null;
    }

    return (
      <div className={ className }>
        Advertisement
      </div>
    );
}

Advertisement.propTypes = {
  hideAds: PropTypes.bool,
  className: PropTypes.string,
};