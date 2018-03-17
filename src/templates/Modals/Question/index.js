import React from 'react';
import PropTypes from 'prop-types';
import MultiChoiceInput from '../Answers/MultiChoiceInput';

export default class Question extends React.Component {
	constructor(props) {
		super(props);

		this.answerTemplate = null;
		this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
	}

	handleAnswerSelected(event) {
		const answer = event.currentTarget.value;

		if (this.props.type == 'range') {
		} else {
			this.props.onAnswerSelected(answer);
		}
	}

	render() {
		switch (this.props.type) {
			case 'range':
				this.answerTemplate = <RangeInput />;
				break;
			case 'radio':
			case 'checkbox':
				this.answerTemplate = (
					<MultiChoiceInput
						answers={this.props.question.answers}
						currentAnswer={this.props.currentAnswer}
						onAnswerSelected={this.handleAnswerSelected}
						type={this.props.type}
					/>
				);
				break;
		}

		return (
			<div>
				<h3>{this.props.question.name}</h3>
				{this.answerTemplate}
				<button 
					className="modal__button"
					onClick={this.props.onQuestionAnswered}
					disabled={this.props.currentAnswer.length <= 0}>
					{' '}
					{this.props.last ? 'Submit' : 'Next'}
				</button>
			</div>
		);
	}
}

Question.propTypes = {
	question: PropTypes.object.isRequired,
	currentAnswer: PropTypes.array.isRequired,
	type: PropTypes.string.isRequired,
	onQuestionAnswered: PropTypes.func.isRequired,
	onAnswerSelected: PropTypes.func.isRequired,
	last: PropTypes.bool.isRequired
};
