import React, { Component } from 'react';

const reload = () => {
  location.reload();
}

export default function AdBlockerDetect() {

    return (
      <div className='backdrop'>
        <div className='modal'>
          <h2>Dear visitor</h2>
          <p> I've noticed that you're using <strong>AdBlocker</strong>, which is a great
          program. However, to proceed with this experiment, I have to ask you to disable it
          for pages on this domain. You can do that by clicking on the AdBlocker icon and selecting:
          <br/><span className='italics'>"Don't run on pages on this domain"</span>.
          </p>
          <p>Sincerely thank you!</p>
          <div className='modal__footer'>
            <button className='modal__button' onClick={ reload }>
              Click here once AdBlocker is disabled
            </button>
          </div>
        </div>
      </div>
    );
}
