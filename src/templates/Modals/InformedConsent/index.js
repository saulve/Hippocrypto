import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { INFORMED_CONSENT } from '../../../constants/modal-strings.js';

export default function InformedConsent(props) {
  return (
    <div>
      <h2>{INFORMED_CONSENT.HEADER}</h2>
      <p dangerouslySetInnerHTML={{ __html: INFORMED_CONSENT.MESSAGE }} />
      <p dangerouslySetInnerHTML={{ __html: INFORMED_CONSENT.SUB_MESSAGE }} />
      <div className="modal__footer">
        <button className="modal__button" onClick={props.onConsent}>
          Begin
        </button>
      </div>
    </div>
  );
}

InformedConsent.propTypes = {
  onConsent: PropTypes.func.isRequired
};
