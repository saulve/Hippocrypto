import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GENERAL, USER_CHOICE } from '../../../constants/modal-strings.js';

export default function UserChoice(props) {
  return (
    <div>
      <h2>{GENERAL.HEADER}</h2>
      <p dangerouslySetInnerHTML={{ __html: USER_CHOICE.MESSAGE }} />
      <p className="italics" dangerouslySetInnerHTML={{ __html: USER_CHOICE.SUB_MESSAGE }}/>
      <div className="modal__footer">
        <button
          className="modal__button modal__button--ads"
          onClick={props.onAds}
        >
          {USER_CHOICE.BUTTON_ADS}
        </button>
        <button
          className="modal__button modal__button--crypto"
          onClick={props.onCrypto}
        >
          {USER_CHOICE.BUTTON_MINING}
        </button>
      </div>
    </div>
  );
}

UserChoice.propTypes = {
  onAds: PropTypes.func.isRequired,
  onCrypto: PropTypes.func.isRequired
};
