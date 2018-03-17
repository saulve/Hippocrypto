import React from 'react';
import PropTypes from 'prop-types';
import CheckboxAnswer from '../Answers/CheckboxAnswer';

export default class Question extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			question: props.question.name,
			answer: []
		};
		this.answerTemplate = null;
		this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
		this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
	}

	handleAnswerSelected(event) {
		const answer = this.props.question.answers[event.currentTarget.value];

		if (this.state.question.type == 'range') {
		} else {
			let _answer = this.state.answer.slice();
			_answer.push(answer);
			this.setState({
				answer: _answer
			});
		}
	}

	handleQuestionAnswered() {
		this.props.onQuestionAnswered(this.state);
	}

	componentWillMount() {
		switch (this.props.type) {
			case 'range':
				this.answerTemplate = <RangeAnswer />;
				break;
			case 'radio':
				this.answerTemplate = <RadioAnswer />;
				break;
			case 'checkbox':
				this.answerTemplate = (
					<CheckboxAnswer
						answers={this.props.question.answers}
						onAnswerSelected={this.handleAnswerSelected}
					/>
				);
				break;
		}
	}

	render() {
		return (
			<div>
				<h3>{this.props.question.name}</h3>
				{this.answerTemplate}
				<button className="modal__button" onClick={this.handleQuestionAnswered}>
					{' '}
					{this.props.last ? 'Submit' : 'Next'}
				</button>
			</div>
		);
	}
}

Question.propTypes = {
	question: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
	onQuestionAnswered: PropTypes.func.isRequired,
	last: PropTypes.bool.isRequired
};
