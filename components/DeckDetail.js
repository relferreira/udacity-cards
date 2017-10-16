import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { removeDeck } from '../actions';
import { removeStoredDeck } from '../utils/api';
import { white, gray, red } from '../utils/colors';
import CustomButton from './CustomButton';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId
    };
  };

  handleNewQuestion = () => {
    const { deck } = this.props;
    this.props.navigation.navigate('NewQuestion', { deckId: deck.title });
  };

  handleQuizSelection = () => {
    const { deck } = this.props;
    this.props.navigation.navigate('Quiz', { deckId: deck.title });
  };

  handleRemove = () => {
    const { deck: { title } } = this.props;
    this.props.removeDeck(title);

    this.toHome();

    removeStoredDeck(title);
  };

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  getQuestionsCount = questions => questions && questions.length;

  render() {
    const { deck } = this.props;
    if (!deck) return null;
    return (
      <View style={styles.constainer}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>{deck.title}</Text>
          <Text style={styles.infoNumber}>
            {this.getQuestionsCount(deck.questions)} cards
          </Text>
        </View>
        <View style={styles.buttons}>
          <CustomButton
            style={styles.addBtn}
            textStyle={{ color: gray }}
            onPress={this.handleNewQuestion}
          >
            Add Card
          </CustomButton>
          <CustomButton onPress={this.handleQuizSelection}>
            Start Quiz
          </CustomButton>
          <CustomButton style={styles.removeBtn} onPress={this.handleRemove}>
            Remove
          </CustomButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: white
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoTitle: {
    fontSize: 36
  },
  infoNumber: {
    marginTop: 10,
    fontSize: 20,
    color: gray
  },
  buttons: {
    marginBottom: 40,
    marginLeft: 16,
    marginRight: 16
  },
  addBtn: {
    backgroundColor: white,
    borderColor: gray,
    borderWidth: 1,
    marginBottom: 10
  },
  removeBtn: {
    marginTop: 10,
    backgroundColor: red
  }
});

const mapStateToProps = (state, { navigation }) => {
  const { deckId } = navigation.state.params;
  return {
    deck: state[deckId]
  };
};

const mapDispatchToProps = {
  removeDeck
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
