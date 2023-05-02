import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderComp from './HeaderComp';
import { getQuestion, INVALID_TOKEN } from '../services/opentdbAPI';
import { removeToken, setScore } from '../redux/actions';

class GameComp extends React.Component {
  state = {
    questions: [],
    currentQuestion: {},
    answered: false,
    totalTimeInSeconds: 30,
    disableBtn: false,
    scoreLocal: 0,
    indexAtual: 1,
  };

  async componentDidMount() {
    const { token } = this.props;
    await this.fetchQuestions(token);
    await this.timer();
  }

  fetchQuestions = (async (token) => {
    const questions = await getQuestion(token);
    if (questions.response_code === INVALID_TOKEN) {
      const { dispatch, history } = this.props;
      dispatch(removeToken());
      history.push('/');
    } else {
      const currentQuestion = questions.results[0];
      currentQuestion.answers = this.randomizeAnswers(currentQuestion);
      // (katia) deixei o estado com todas as questões preparado para quando tiver que navegar por mais de uma pergunta
      this.setState({ questions, currentQuestion });
      // this.setState({ currentQuestion });
    }
  });

  randomizeAnswers = (question) => {
    const incorrect = question.incorrect_answers.map((answer, index) => ({
      text: answer, testId: `wrong-answer-${index}`, clickedClass: 'border-wrong' }));
    const correct = {
      text: question.correct_answer,
      testId: 'correct-answer',
      clickedClass: 'border-correct' };
    const answers = [...incorrect, correct]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return answers;
  };

  renderAnswers = (answers) => {
    const { answered, disableBtn } = this.state;
    const buttons = answers.map((answer) => (
      <button
        key={ answer.text }
        data-testid={ answer.testId }
        className={ answered ? answer.clickedClass : '' }
        onClick={ () => this.answerQuestion(answer.text) }
        disabled={ disableBtn }
      >
        { answer.text }
      </button>
    ));
    return buttons;
  };

  difficultyValue = (difficulty) => {
    const magicNumber = 3;
    switch (difficulty) {
    case 'hard':
      return magicNumber;
    case 'medium':
      return 2;
    default:
      return 1;
    }
  };

  answerQuestion = async (answer) => {
    this.setState({ answered: true });
    const { currentQuestion, totalTimeInSeconds } = this.state;
    const { dispatch } = this.props;
    let total = 0;
    const difficultyHeight = this.difficultyValue(currentQuestion.difficulty);
    const magicNumber = 10;
    if (currentQuestion.correct_answer === answer) {
      total = magicNumber * (totalTimeInSeconds * difficultyHeight);
      await this.setState((prevState) => ({
        scoreLocal: prevState.scoreLocal + total,
      }));
      const { scoreLocal } = this.state;
      dispatch(setScore(scoreLocal));
    }
  };

  timer = () => {
    const magicNumber = 1000;
    const myInterval = setInterval(() => {
      const { totalTimeInSeconds } = this.state;
      if (totalTimeInSeconds === 0) {
        clearInterval(myInterval);
        this.setState({
          disableBtn: true,
        });
      } else {
        this.setState((prevState) => ({
          totalTimeInSeconds: prevState.totalTimeInSeconds - 1,
        }));
      }
    }, magicNumber);
  };

  clickNext = () => {
    const { questions, indexAtual } = this.state;
    const { history } = this.props;
    const { results } = questions;
    if (indexAtual >= results.length) {
      history.push('/feedback');
    } else {
      const nextQuestion = results[indexAtual];
      nextQuestion.answers = this.randomizeAnswers(nextQuestion);
      this.setState((prevState) => ({
        indexAtual: prevState.indexAtual + 1,
        answered: false,
        totalTimeInSeconds: 30,
      }));
      this.setState({
        currentQuestion: nextQuestion,
      });
    }
  };

  render() {
    const { currentQuestion, totalTimeInSeconds, answered } = this.state;
    return (
      <div>
        <HeaderComp />
        <span>
          { totalTimeInSeconds }
        </span>
        <div data-testid="question-category">{ currentQuestion?.category }</div>
        <div data-testid="question-text">{ currentQuestion?.question }</div>
        <div data-testid="answer-options">
          { currentQuestion.answers?.length > 0
          && this.renderAnswers(currentQuestion.answers)}
        </div>
        { (answered) && (
          <button
            data-testid="btn-next"
            onClick={ () => this.clickNext() }
          >
            Next
          </button>)}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.api.token,
});

GameComp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
GameComp.defaultProps = {
  token: '',
};

export default connect(mapStateToProps)(GameComp);
