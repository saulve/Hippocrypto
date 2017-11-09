import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Advertisement extends Component {
  render() {
    const { hideAds, className } = this.props;

    if (hideAds || hideAds === null) {
      return null;
    }

    return (
      <div className={ className }>
        Advertisement
      </div>
    );
  }
}

Advertisement.propTypes = {
  hideAds: PropTypes.bool,
  className: PropTypes.string,
};

export default Advertisement;
