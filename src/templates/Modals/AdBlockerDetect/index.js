import React, { Component } from 'react';
import { GENERAL, AD_BLOCKER } from '../../../constants/modal-strings.js';

const reload = () => {
  location.reload();
};

export default function AdBlockerDetect() {
  return (
    <div>
      <h2>{GENERAL.HEADER}</h2>
      <p dangerouslySetInnerHTML={{ __html: AD_BLOCKER.MESSAGE }} />
      <p dangerouslySetInnerHTML={{ __html: AD_BLOCKER.SUB_MESSAGE }} />
      <div className="modal__footer">
        <button className="modal__button" onClick={reload}>
          {AD_BLOCKER.BUTTON}
        </button>
      </div>
    </div>
  );
}
