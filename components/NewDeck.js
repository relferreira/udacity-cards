import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import CustomButton from './CustomButton';

class NewDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }
  handleTextChange = value => this.setState({ value });

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
        <CustomButton style={styles.btn}>Submit</CustomButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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

export default connect()(NewDeck);
