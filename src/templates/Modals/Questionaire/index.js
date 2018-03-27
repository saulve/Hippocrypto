import React from 'react';
import PropTypes from 'prop-types';
import Question from '../Question';
import InformedConsent from '../InformedConsent';
import { QUESTIONS } from '../../../constants/modal-strings.js';

export default class Questionaire extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      question: QUESTIONS[0],
      questionNum: 1,
      last: false,
      currentAnswer: [],
      showOther: false,
      consent: false
    };
    this.answers = {};
    this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.onConsent = this.onConsent.bind(this);
  }

  handleAnswerSelected(val) {
    let _currentAnswer;
    const index = this.state.currentAnswer.indexOf(val);
    if (index == -1) {
      if (this.state.question.type == 'checkbox') {
        // save answer state for multiple checkboxes
        _currentAnswer = this.state.currentAnswer.slice();
      } else {
        // overwrite the state for radio and range inputs
        _currentAnswer = [];
      }
      _currentAnswer.push(val);
    } else {
      _currentAnswer = this.state.currentAnswer.slice();
      _currentAnswer.splice(index, 1); // remove item
    }

    this.setState({
      currentAnswer: _currentAnswer
    });
  }

  handleQuestionAnswered() {
    const _currentAnswer = this.state.currentAnswer.slice();
    const shortName = this.state.question.shortName;
    this.answers[shortName] = {
      question: this.state.question.name,
      answer: _currentAnswer
    };
    this.setState({
      currentAnswer: []
    });

    if (this.state.last) {
      this.props.onSurveyFinish(this.answers);
      return;
    } else {
      let counter = this.findNextQuestion(this.state.counter);
      const questionNum = counter + 1;
      const last = this.findNextQuestion(counter) ? false : true; // check if there will be more questions

      this.setState({
        counter: counter,
        question: QUESTIONS[counter],
        questionNum: questionNum,
        last: last
      });
    }
  }

  onConsent() {
    this.setState({
      consent: true
    });
  }

  findNextQuestion(counter) {
    for (let i = counter + 1; i < QUESTIONS.length; ++i) {
      if (
        !QUESTIONS[i].hasOwnProperty('isAds') ||
        QUESTIONS[i].isAds == this.props.isAds
      ) {
        return i;
      }
    }
    return null;
  }

  renderQuestion() {
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

  render() {
    const el = this.state.consent ? (
      this.renderQuestion()
    ) : (
      <InformedConsent onConsent={this.onConsent} />
    );

    return el;
  }
}

Questionaire.propTypes = {
  onSurveyFinish: PropTypes.func.isRequired,
  isAds: PropTypes.bool.isRequired
};
