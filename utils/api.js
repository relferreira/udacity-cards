import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'DECKS';

export function submitDeck(deck) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));
}

export function removeStoredDeck(key) {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    delete data[key];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
}

export function fetchDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then(JSON.parse);
}
