import React from 'react';
import PropTypes from 'prop-types';
import MultiChoiceInput from '../Answers/MultiChoiceInput';
import RangeInput from '../Answers/RangeInput';


export default function Question(props) {
	let answerTemplate = null;

	function handleAnswerSelected(event) {
		const answer = event.currentTarget.value;
    props.onAnswerSelected(answer);
	}

  function handleOther(event) {
    props.onOtherSelected()
  }

	switch (props.type) {
		case 'range':
			answerTemplate = (
				<RangeInput
          min={props.question.rangeStart}
          max={props.question.rangeFinish}
          labels={props.question.labels}
        />
			 );
			break;
		case 'radio':
		case 'checkbox':
			answerTemplate = (
				<MultiChoiceInput
					answers={props.question.answers}
					currentAnswer={props.currentAnswer}
					onAnswerSelected={handleAnswerSelected}
					type={props.type}
          isOther={props.showOther}
				/>
			);
			break;
	}

	return (
		<div>
			<h3>{props.question.name}</h3>
			{answerTemplate}
			<button
				className="modal__button"
				onClick={props.onQuestionAnswered}
				disabled={props.currentAnswer.length <= 0}
			>
				{' '}
				{props.last ? 'Submit' : 'Next'}
			</button>
		</div>
	);
}

Question.propTypes = {
	question: PropTypes.object.isRequired,
	currentAnswer: PropTypes.array.isRequired,
	type: PropTypes.string.isRequired,
	onQuestionAnswered: PropTypes.func.isRequired,
	onAnswerSelected: PropTypes.func.isRequired,
  last: PropTypes.bool.isRequired,
	isOther: PropTypes.bool.isRequired,
};
