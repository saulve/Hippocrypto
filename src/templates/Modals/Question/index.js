import React from 'react';
import PropTypes from 'prop-types';
import MultiChoiceInput from '../Answers/MultiChoiceInput';

export default function Question(props) {

  function handleAnswerSelected(event) {
    const answer = event.currentTarget.value;
    props.onAnswerSelected(answer);
  }

  return (
    <div>
      <h3>{props.question.name}</h3>
      <MultiChoiceInput
          answers={props.question.answers}
          currentAnswer={props.currentAnswer}
          onAnswerSelected={handleAnswerSelected}
          type={props.type}
        />
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
  last: PropTypes.bool.isRequired
};
