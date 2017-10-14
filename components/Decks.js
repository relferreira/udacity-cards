import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Card from './Card';

const DATA = [
  { key: '123', title: 'udacicards', num: 3 },
  { key: '1234', title: 'new deck', num: 0 }
];

class Decks extends Component {
  renderItem = ({ item }) => {
    return <Card {...item} />;
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList data={DATA} renderItem={this.renderItem} />
      </View>
    );
  }
}

export default connect()(Decks);
