import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { THANK_YOU } from '../../../constants/modal-strings.js';
import toggleExampleGif from '../../../../assets/mining-toggle-explanation.gif';

export default function ThankYou(props) {
  const renderToggleExample = () => {
    return(
      <div>
        <p dangerouslySetInnerHTML={{ __html: THANK_YOU.SUB_MESSAGE }}/>
        <img src={toggleExampleGif}/>
      </div>
    );
  }

  return (
    <div>
      <h2>{THANK_YOU.HEADER}</h2>
      <p dangerouslySetInnerHTML={{ __html: THANK_YOU.MESSAGE }} />
      { props.isMining ? renderToggleExample() : null}
      <div className="modal__footer">
        <button
          className="modal__button"
          onClick={props.onThankYouClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

ThankYou.propTypes = {
  isMining: PropTypes.bool.isRequired,
  onThankYouClose: PropTypes.func.isRequired
};
