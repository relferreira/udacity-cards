import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import reducer from './reducers';
import { primaryColor, white } from './utils/colors';
import CustomStatusBar from './components/CustomStatusBar';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';

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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
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
  }
});
