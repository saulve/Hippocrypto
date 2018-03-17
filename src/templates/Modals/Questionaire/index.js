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
			last: false
			// answered: ''
		};
		this.answers = [];
		this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
	}

	componentWillMount() {
		this.setState({
			question: QUESTIONS[0]
		});
	}

	handleQuestionAnswered(qa) {

		this.answers.push(qa);

		if (this.state.questionNum == QUESTIONS.length) {
			this.props.onSurveyFinish(this.answers);
		} else {
			const counter = this.state.counter++;
			const questionNum = this.state.questionNum++;
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
				type={this.state.question.type}
				onQuestionAnswered={this.handleQuestionAnswered}
				last={this.state.last}
			/>
		);
	}
}

Questionaire.propTypes = {
	onSurveyFinish: PropTypes.func.isRequired
};
