import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { saveDeck } from '../actions';
import { submitDeck } from '../utils/api';
import { white } from '../utils/colors';
import CustomButton from './CustomButton';

class NewDeck extends Component {
  static navigationOptions = () => ({
    title: 'New Deck'
  });

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }
  handleTextChange = value => this.setState({ value });

  handleSubmit = () => {
    const { value: key } = this.state;
    const newDeck = { [key]: { title: key, questions: [] } };
    // Save redux store
    this.props.saveDeck(newDeck);
    // Save in async storage
    submitDeck(newDeck);
    // Reset state
    this.setState({ value: '' });
    // Go to deck detail view
    this.toDeckDetail(key);
  };

  toDeckDetail = key => {
    this.props.navigation.navigate('DeckDetail', { deckId: key });
  };

  checkErrors = () => !this.state.value;

  render() {
    const { value } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          placeholder="Deck name"
          value={value}
          onChangeText={this.handleTextChange}
        />
        <CustomButton
          style={styles.btn}
          onPress={this.handleSubmit}
          disabled={this.checkErrors()}
        >
          Submit
        </CustomButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: white
  },
  title: {
    margin: 16,
    fontSize: 30,
    textAlign: 'center'
  },
  input: {
    height: 44
  },
  btn: {
    marginTop: 20
  }
});

const mapDispatchToProps = {
  saveDeck
};

export default connect(null, mapDispatchToProps)(NewDeck);
