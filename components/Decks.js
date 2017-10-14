import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Card from './Card';

const DATA = [
  { key: '123', title: 'udacicards', questions: [] },
  { key: '1234', title: 'new deck', questions: [] }
];

class Decks extends Component {
  renderItem = ({ item }) => {
    const { title, questions } = item;
    const num = questions.length;
    return <Card title={title} num={num} />;
  };
  render() {
    const { decks } = this.props;
    if (decks.length === 0)
      return (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="cards-outline" size={100} />
          <Text>No Decks!</Text>
        </View>
      );
    return (
      <View style={styles.container}>
        <FlatList data={decks} renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return {
    decks: Object.keys(state).map((key, index) => ({
      ...state[key],
      key: index
    }))
  };
};

export default connect(mapStateToProps)(Decks);
