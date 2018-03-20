import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdBlockerDetect from '../AdBlockerDetect';
import UserChoice from '../UserChoice';
import Questionaire from '../Questionaire';
import ThankYou from '../ThankYou';
import { GENERAL, AD_BLOCKER } from '../../../constants/modal-strings.js';

export default function ModalContainer(props) {
  const reload = () => {
    location.reload();
  };
  // Render nothing if the "show" prop is false
  let modal;
  if (props.onAdBlocker) {
    // show request to disable ad-blocker
    modal = <AdBlockerDetect />;
  } else if (props.questionaire) {
    // show questionaire
    modal = (
      <Questionaire
        isAds={!props.isMining}
        onSurveyFinish={props.onSurveyFinish}
      />
    );
  } else if (props.thankYou) {
    modal = <ThankYou isMining={props.isMining} onThankYouClose={props.onThankYouClose} />
  } else if (props.show) {
    // show monetization choice modal
    modal = <UserChoice onAds={props.onAds} onCrypto={props.onCrypto} />;
  }  else {
    // close modal
    return null;
  }

  return (
    <div className="backdrop">
      <div className="modal">{modal}</div>
    </div>
  );
}

ModalContainer.propTypes = {
  onAds: PropTypes.func.isRequired,
  onCrypto: PropTypes.func.isRequired,
  onSurveyFinish: PropTypes.func.isRequired,
  onThankYouClose: PropTypes.func.isRequired,
  onAdBlocker: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  isMining: PropTypes.bool,
  questionaire: PropTypes.bool,
  thankYou: PropTypes.bool
};
