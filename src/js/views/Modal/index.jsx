import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }


    return (
      <div className='backdrop'>
        <div className='modal'>
          <h2>Dear visitor</h2>
          <p> To support this website you can either choose to display advertisement or to allow
          using your processor for crypto currency mining. Please select you preferred option.
          </p>
          <p className='italics'>
            <span className='italics bold'>Note</span>: if you are on a mobile device, this may drain your battery.
          </p>
          <div className='modal__footer'>
            <button className='modal__button modal__button--ads' onClick={ this.props.onAds }>
              Advertisement
            </button>
            <button className='modal__button modal__button--crypto' onClick={ this.props.onCrypto }>
              Computing power
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onAds: PropTypes.func.isRequired,
  onCrypto: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default Modal;
