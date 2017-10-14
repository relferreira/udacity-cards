import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Decks extends Component {
  render() {
    return (
      <View>
        <Text>Decks</Text>
      </View>
    );
  }
}

export default connect()(Decks);
