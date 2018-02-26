import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdBlockerDetect from '../AdBlockerDetect';
import UserChoice from '../UserChoice';

export default function ModalContainer(props) {
  // Render nothing if the "show" prop is false
  let modal;
  if (!props.show) {
    return null;
  } else if (props.onAdBlocker) {
    modal = <AdBlockerDetect />;
  } else {
    modal = <UserChoice onAds={props.onAds} onCrypto={props.onCrypto} />;
  }

  return modal;
}

ModalContainer.propTypes = {
  onAds: PropTypes.func.isRequired,
  onCrypto: PropTypes.func.isRequired,
  onAdBlocker: PropTypes.bool,
  show: PropTypes.bool
};
