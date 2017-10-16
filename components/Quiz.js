import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { white, primaryColor, red, green, gray } from '../utils/colors';
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/notification';
import CustomButton from './CustomButton';

class Quiz extends Component {
  static navigationOptions = () => ({
    title: 'Quiz'
  });

  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      showAnswer: false,
      numCorrect: 0
    };
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  handleShowAnswer = () =>
    this.setState(({ showAnswer }) => ({ showAnswer: !showAnswer }));

  handleNextQuestion = correct =>
    this.setState(({ questionIndex, numCorrect }) => ({
      questionIndex: questionIndex + 1,
      numCorrect: correct ? numCorrect + 1 : numCorrect,
      showAnswer: false
    }));

  handleRestartQuiz = () =>
    this.setState({
      questionIndex: 0,
      showAnswer: false,
      numCorrect: 0
    });

  handleBack = () => this.props.navigation.dispatch(NavigationActions.back());

  calculateScore = questions => {
    const { numCorrect } = this.state;

    return (numCorrect * 100 / questions.length).toFixed(1);
  };

  render() {
    const { deck: { questions } } = this.props;
    const { questionIndex, showAnswer } = this.state;

    if (questionIndex >= questions.length)
      return (
        <View style={styles.container}>
          <View style={styles.question}>
            <Text style={styles.questionTitle}>
              {`${this.calculateScore(questions)} %`}
            </Text>
            <Text style={styles.questionSubtitle}>Correct</Text>
          </View>
          <View style={styles.buttons}>
            <CustomButton onPress={this.handleRestartQuiz}>
              Restart Quiz
            </CustomButton>
            <CustomButton style={{ marginTop: 10 }} onPress={this.handleBack}>
              Back to Deck
            </CustomButton>
          </View>
        </View>
      );

    const selectedQuestion = questions[questionIndex];
    return (
      <View style={styles.container}>
        <Text style={styles.indicator}>
          {questionIndex + 1}/{questions.length}
        </Text>
        <View style={styles.question}>
          <Text style={styles.questionTitle}>
            {!showAnswer ? selectedQuestion.question : selectedQuestion.answer}
          </Text>
          <CustomButton
            style={styles.questionBtn}
            textStyle={{ color: red }}
            onPress={this.handleShowAnswer}
          >
            {!showAnswer ? 'Answer' : 'Question'}
          </CustomButton>
        </View>
        <View style={styles.buttons}>
          <CustomButton
            style={{ backgroundColor: green }}
            onPress={() => this.handleNextQuestion(true)}
          >
            Correct
          </CustomButton>
          <CustomButton
            style={{ backgroundColor: red, marginTop: 10 }}
            onPress={() => this.handleNextQuestion(false)}
          >
            Incorrect
          </CustomButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  indicator: {
    fontSize: 16,
    padding: 16
  },
  question: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  questionTitle: {
    fontSize: 36,
    textAlign: 'center'
  },
  questionSubtitle: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center'
  },
  questionBtn: {
    backgroundColor: white,
    marginTop: 20
  },
  buttons: {
    padding: 16
  }
});

const mapStateToProps = (state, { navigation }) => {
  const { deckId } = navigation.state.params;
  return {
    deck: state[deckId]
  };
};

export default connect(mapStateToProps)(Quiz);
