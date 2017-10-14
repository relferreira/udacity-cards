import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import reducer from './reducers';
import { primaryColor, white } from './utils/colors';
import { fetchDecks } from './utils/api';
import { receiveDecks } from './actions';
import CustomStatusBar from './components/CustomStatusBar';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';

const store = createStore(reducer);

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards-outline"
            size={30}
            color={tintColor}
          />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="plus" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: white,
      style: {
        backgroundColor: primaryColor
      }
    }
  }
);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null
    };
  }
  componentDidMount() {
    fetchDecks()
      .then(decks => {
        store.dispatch(receiveDecks(decks));
        this.setState({ loading: false });
      })
      .catch(err => {
        console.warn(err);
        this.setState({ error: 'Something exploded!' });
      });
  }

  render() {
    const { loading, error } = this.state;
    if (loading) return <ActivityIndicator />;
    if (error)
      return (
        <View style={styles.errorContainer}>
          <Text>{error}</Text>
        </View>
      );
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <CustomStatusBar
            backgroundColor={primaryColor}
            barStyle="light-content"
          />
          <Tabs />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
