import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function UserChoice(props) {
    return (
      <div className='backdrop'>
        <div className='modal'>
          <h2>Dear visitor</h2>
          <p> To support this website you can either choose to display advertisement or to allow
          using your processor for crypto currency mining. Please select your preferred option.
          </p>
          <p className='italics'>
            <span className='italics bold'>Note</span>: if you are on a mobile device, this may drain your battery.
          </p>
          <div className='modal__footer'>
            <button className='modal__button modal__button--ads' onClick={ props.onAds }>
              Advertisement
            </button>
            <button className='modal__button modal__button--crypto' onClick={ props.onCrypto }>
              Computing power
            </button>
          </div>
        </div>
      </div>
    );
}

UserChoice.propTypes = {
  onAds: PropTypes.func.isRequired,
  onCrypto: PropTypes.func.isRequired,
};

