import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function Advertisement(props) {
	const { hideAds, className } = props;

	if (hideAds || hideAds === null || typeof hideAds === 'undefined') {
      return null;
    }

    return (
      <div className={ className }>
      <div className="advert">
        Advertisement
      </div>
      </div>
    );
}

Advertisement.propTypes = {
  hideAds: PropTypes.bool,
  className: PropTypes.string,
};
