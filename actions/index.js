export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const SAVE_DECK = 'SAVE_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function saveDeck(deck) {
  return {
    type: SAVE_DECK,
    deck
  };
}

export function removeDeck(deckId) {
  return {
    type: REMOVE_DECK,
    deckId
  };
}
