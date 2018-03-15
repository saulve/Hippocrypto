import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdBlockerDetect from '../AdBlockerDetect';
import UserChoice from '../UserChoice';
import {GENERAL, AD_BLOCKER} from '../../../constants/modal-strings.js'

export default function ModalContainer(props) {
  const reload = () => {
    location.reload();
  };
  // Render nothing if the "show" prop is false
  let modal;
  if (!props.show) {
    return null;
  } else if (props.onAdBlocker) {
    modal = <AdBlockerDetect />;
  } else {
    modal = <UserChoice onAds={props.onAds} onCrypto={props.onCrypto} />;
  }

  return (
    <div className="backdrop">
      <div className="modal">
        {modal}
      </div>
    </div>
  );
}

ModalContainer.propTypes = {
  onAds: PropTypes.func.isRequired,
  onCrypto: PropTypes.func.isRequired,
  onAdBlocker: PropTypes.bool,
  show: PropTypes.bool
};
