import { RECEIVE_DECKS, SAVE_DECK, REMOVE_DECK } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return { ...state, ...action.decks };
    case SAVE_DECK:
      return { ...state, ...action.deck };
    case REMOVE_DECK:
      const { [action.deckId]: deletedItem, ...rest } = state;
      return rest;
    default:
      return state;
  }
}
