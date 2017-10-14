import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { saveDeck } from '../actions';
import { submitDeck } from '../utils/api';
import { white } from '../utils/colors';
import CustomButton from './CustomButton';

class NewDeck extends Component {
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
    this.props.saveDeck(newDeck);
    this.toHome();

    submitDeck(newDeck);
  };

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({
        key: 'NewDeck'
      })
    );
  };

  render() {
    const { value } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          placeholder="Deck name"
          value={value}
          onChangeText={this.handleTextChange}
        />
        <CustomButton style={styles.btn} onPress={this.handleSubmit}>
          Submit
        </CustomButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white
  },
  title: {
    margin: 16,
    fontSize: 30,
    textAlign: 'center'
  },
  input: {
    width: 200,
    height: 44
  },
  btn: {
    width: 100,
    marginTop: 20
  }
});

const mapDispatchToProps = {
  saveDeck
};

export default connect(null, mapDispatchToProps)(NewDeck);
