import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import reducer from './reducers';
import { primaryColor, white, black } from './utils/colors';
import { fetchDecks } from './utils/api';
import { setLocalNotification } from './utils/notification';
import { receiveDecks } from './actions';
import CustomStatusBar from './components/CustomStatusBar';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import DeckDetail from './components/DeckDetail';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';

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
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primaryColor,
        elevation: 0,
        shadowOpacity: 0
      }
    },
    tabBarOptions: {
      activeTintColor: white,
      style: {
        backgroundColor: primaryColor
      }
    }
  }
);

const navigationOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: primaryColor
  }
};

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions
  },
  Quiz: {
    screen: Quiz,
    navigationOptions
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    setLocalNotification();
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
    if (loading)
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
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
            backgroundColor={Platform.OS === 'ios' ? black : primaryColor}
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
