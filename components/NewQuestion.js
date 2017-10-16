import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { saveDeck } from '../actions';
import { white } from '../utils/colors';
import { submitDeck } from '../utils/api';
import CustomButton from './CustomButton';

class NewQuestion extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'New card'
  });

  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: ''
    };
  }

  handleQuestionChange = question => this.setState({ question });

  handleAnswerChange = answer => this.setState({ answer });

  handleSubmit = () => {
    let { deck } = this.props;
    const newQuestion = this.state;

    const updatedDeck = {
      [deck.title]: {
        title: deck.title,
        questions: deck.questions.concat(newQuestion)
      }
    };

    this.props.saveDeck(updatedDeck);

    submitDeck(updatedDeck);

    this.goBack();
  };

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Question"
            value={question}
            onChangeText={this.handleQuestionChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Answer"
            value={answer}
            onChangeText={this.handleAnswerChange}
          />
        </View>
        <CustomButton style={styles.btn} onPress={this.handleSubmit}>
          Submit
        </CustomButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: white
  },
  inputs: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    height: 44,
    marginBottom: 30
  },
  btn: {
    marginBottom: 20
  }
});

const mapStateToProps = (state, { navigation }) => {
  const { deckId } = navigation.state.params;
  return {
    deck: state[deckId]
  };
};

const mapDispatchToProps = {
  saveDeck
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
