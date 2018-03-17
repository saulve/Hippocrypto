import React from 'react';
import PropTypes from 'prop-types';

export default function CheckboxAnswer(props) {

	function renderAnswerOptions(val, index) {
		return (
			<li>
				<input 
					type="checkbox"
					name="checkboxGroup"
					id={`answer${index}`}
					value={index}
					onChange={props.onAnswerSelected}
				/>
				<label htmlFor={`answer${index}`}>
					{val}
				</label>
			</li>
		);
	}

	return (
		<ul>
			{props.answers.map(renderAnswerOptions)}
		</ul>
	);
}

CheckboxAnswer.propTypes = {
	answers: PropTypes.array.isRequired,
	onAnswerSelected: PropTypes.func.isRequired,
};
