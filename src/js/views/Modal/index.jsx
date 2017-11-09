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
          {this.props.children}

          <div className='modal__footer'>
            <button className='modal__button' onClick={ this.props.onAds }>
              Advertisement
            </button>
            <button className='modal__button' onClick={ this.props.onCrypto }>
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
  children: PropTypes.node,
};

export default Modal;
