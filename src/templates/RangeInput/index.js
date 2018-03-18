import React from 'react';
import PropTypes from 'prop-types';

export default class RangeInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.currentThrottle
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => {
    const val = event.currentTarget.value;
    this.setState({
      value: val
    });
    this.props.handleThrottleChange(val);
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <input
          style={{direction: 'rtl'}}
          type="range"
          min={0}
          max={0.9}
          value={value}
          step={0.01}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

RangeInput.propTypes = {
  currentThrottle: PropTypes.number.isRequired,
  handleThrottleChange: PropTypes.func.isRequired
};
