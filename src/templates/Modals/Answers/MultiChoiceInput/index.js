import React from 'react';
import PropTypes from 'prop-types';

export default function MultiChoiceInput(props) {
  function renderAnswerOptions(val, index) {
    const other = props.answers[index] == 'Other' ? showOther() : null;
		return (
			<li key={index}>
				<input
					type={props.type}
					name="checkboxGroup"
					id={`answer${index}`}
					value={props.answers[index]}
					onChange={props.onAnswerSelected}
					checked={props.currentAnswer.includes(props.answers[index])}
				/>
				<label htmlFor={`answer${index}`}>{val}</label>
        {other}
			</li>
		);
	}

  const showOther = () => {
    return (
      <br/>
      <li>
        <label htmlFor="other">Other:</label>
        <input
          type="text"
          name="other"
          id="other"
          placeholder="You can provide a different answer here"
          ref={(input) => other = input}
        />
      </li>
    );
  }

	return (
    <ul>
      {props.answers.map(renderAnswerOptions)}
    </ul> );
}

MultiChoiceInput.propTypes = {
	answers: PropTypes.array.isRequired,
	currentAnswer: PropTypes.array.isRequired,
	onAnswerSelected: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
	showOther: PropTypes.bool.isRequired,
};
