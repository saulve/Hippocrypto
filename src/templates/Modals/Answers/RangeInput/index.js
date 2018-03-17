import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'

export default class RangeInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.min
    };
  }
  handleAnswerSelected = val => {
    this.setState({
      value: val
    });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="slider custom-labels">
        <Slider
          min={this.props.rangeStart}
          max={this.props.rangeFinish}
          value={value}
          labels={this.props.labels}
          handleLabel={value}
          onChange={this.handleAnswerSelected}
        />
      </div>
    );
  }
}

RangeInput.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  labels: PropTypes.object.isRequired
};
