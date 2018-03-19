import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RangeInput from '../RangeInput';

export default class MiningStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isThrotControlOpen: false
    };

    this.toggleThrottleControl = this.toggleThrottleControl.bind(this);
    this.handleThrottleChange = this.handleThrottleChange.bind(this);
    this.renderThrottleControls = this.renderThrottleControls.bind(this);
  }

  handleThrottleChange(value) {
    const throttle = value;
    this.props.handleThrottleChange(throttle)
  }

  toggleThrottleControl() {
    const show = !this.state.isThrotControlOpen;
    this.setState({
      isThrotControlOpen: show
    })
  }

  renderThrottleControls() {
    return(
      <RangeInput
        currentThrottle={this.props.throttle}
        handleThrottleChange={this.handleThrottleChange}
      />
    );
  }

  render() {
    if (!this.props.hideAds || this.props.hideAds === null) {
      return null;
    }
    return (
      <div className="grid__cell col-2/12 col-1/12--widescreen miner">
        <ul>
          <li className="miner__metric">
            <a
              href="https://bitcoin.org/en/vocabulary#hash-rate"
              target="_blank"
            >
              Hash rate
            </a>
            <br />
            <span className="miner__result">
              {' '}
              {Math.trunc(this.props.minerData.hashesPerSecond)}
            </span>
            <span className="miner__result-suffix">h/s</span>
          </li>
          <li className="miner__metric">
            Total hashes submitted
            <br />
            <span className="miner__result">
              {' '}
              {Math.trunc(this.props.minerData.totalHashes)}{' '}
            </span>
          </li>
          <li className="miner__metric miner__result--secondary">
            Total hashes accepted
            <br />
            <span className="miner__result">
              {' '}
              {Math.trunc(this.props.minerData.acceptedHashes)}{' '}
            </span>
          </li>
          <li className="miner__metric miner__result--secondary">
            <a
              href="https://www.techopedia.com/definition/27857/thread-operating-systems"
              target="_blank"
            >
              Number of threads
            </a>
            <br />
            <span className="miner__result"> {this.props.minerData.numThreads} </span>
          </li>
          <li
            className="miner__metric miner__throttle"
            onClick={this.toggleThrottleControl}
          >
            Miner power
            <br />
            <span className="miner__result">
              {' '}
              {Math.round((1 - this.props.throttle) * 100)}%
            </span>
          </li>
          { this.state.isThrotControlOpen ? this.renderThrottleControls() : null }
        </ul>
      </div>
    );
  }
}

MiningStatus.propTypes = {
  hideAds: PropTypes.bool,
  minerData: PropTypes.object,
  throttle: PropTypes.number,
  handleThrottleChange: PropTypes.func
};
