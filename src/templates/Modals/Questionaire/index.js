import React from 'react';
import PropTypes from 'prop-types';
import Question from '../Question';
import { QUESTIONS } from '../../../constants/modal-strings.js';

export default class Questionaire extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			counter: 0,
			question: null,
			questionNum: 1,
			last: false,
			currentAnswer: []
		};
		this.answers = [];
		this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
		this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
	}

	componentWillMount() {
		this.setState({
			question: QUESTIONS[0]
		});
	}

	handleAnswerSelected(val) {
		if (!this.state.currentAnswer.includes(val)) {
			let _currentAnswer;
			if (this.state.question.type == 'checkbox') {
				// save answer state for multiple checkboxes
				_currentAnswer = this.state.currentAnswer.slice();
			} else {
				// overwrite the state for radio and range inputs
				_currentAnswer = [];
			}
			_currentAnswer.push(val);
			this.setState({
				currentAnswer: _currentAnswer
			});
		}
	}

	handleQuestionAnswered() {
		const _currentAnswer = this.state.currentAnswer.slice();
		// if (this.state.question.type == 'checkbox') {
		// } else {
		// 	_currentAnswer = Object.assign({}, this.state.currentAnswer);
		// }
		// const _currentAnswer = this.state.currentAnswer.slice();
		this.answers.push({
			question: this.state.question.name,
			answer: _currentAnswer
		});
		this.setState({
			currentAnswer: []
		});

		if (this.state.questionNum == QUESTIONS.length) {
			this.props.onSurveyFinish(this.answers);
		} else {
			const counter = ++this.state.counter;
			const questionNum = ++this.state.questionNum;
			const last = questionNum == QUESTIONS.length ? true : false;

			this.setState({
				counter: counter,
				question: QUESTIONS[counter],
				questionNum: questionNum,
				last: last
			});
		}
	}

	render() {
		return (
			<Question
				question={this.state.question}
				currentAnswer={this.state.currentAnswer}
				type={this.state.question.type}
				onQuestionAnswered={this.handleQuestionAnswered}
				onAnswerSelected={this.handleAnswerSelected}
				last={this.state.last}
			/>
		);
	}
}

Questionaire.propTypes = {
	onSurveyFinish: PropTypes.func.isRequired
};
