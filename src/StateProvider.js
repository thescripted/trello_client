// DataStore. This is the location of all the lists & cards that is passed down to react components for rendering.
// The API here will fetch data from the database and perform asynchronous operations upon Update, Delete, and Modifying card information.
import React, { createContext, useReducer } from 'react';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { get } from 'immer/dist/internal';

const reducer = (state, action) => {
  switch (action.type) {
    case 'HEY':
      console.log('Hey: ', state);
      return [...state];

    case 'ADD_LIST':
      const TEMP_LIST_ID = uuidv4();
      const list_item = {
        title: action.value,
        list_id: TEMP_LIST_ID,
        cards: [],
        pos: 4 // todo: add getNextPosition()
      };
      return [...state, list_item];

    case 'UPDATE_LIST':
      const listToUpdate = state.findIndex(item => item.list_id === action.id);
      return produce(state, updater => {
        updater[listToUpdate].title = action.value;
      });

    case 'DELETE_LIST':
      const listToDelete = state.findIndex(item => item.list_id === action.id);
      if (listToDelete === -1) {
        throw new Error('Unable to Find the List Index to delete');
      }
      return produce(state, updater => {
        updater.splice(listToDelete, 1);
      });

    case 'ADD_CARD':
      const CARD_TEMP_ID = uuidv4();
      const card_item = {
        content: action.content,
        card_id: CARD_TEMP_ID,
        pos: 4 // todo: add getNextCardPosition()
      };
      return produce(state, updater => {
        const getListIndex = updater.findIndex(item => item.list_id === action.id);
        updater[getListIndex].cards.push(card_item);
      });

    case 'UPDATE_CARD':
      // return produce(state, updater => {
      //   const getListIndex = updater.findIndex(item => item.list_id === action.id);
      //   const getCardIndex = updater[getListIndex].cards.findIndex(
      //     item => item.card_id === action.card_id
      //   );
      //   updater[getListIndex].cards[getCardIndex] = action.value;
      // });
      return 0;
    case 'DELETE_CARD':
      return produce(state, updater => {
        const getListIndex = updater.findIndex(item => item.list_id === action.id);
        const getCardIndex = updater[getListIndex].cards.findIndex(
          item => item.card_id === action.card_id
        );
        updater[getListIndex].cards.splice(getCardIndex, 1);
      });

    default:
      throw new Error();
  }
};

const initialState = [
  {
    title: 'Ben',
    list_id: '100',
    cards: [
      { content: 'Hey', card_id: '101', pos: 1 },
      { content: 'Hi', card_id: '102', pos: 2 },
      { content: 'Hello', card_id: '103', pos: 3 }
    ],
    pos: 1
  },
  {
    title: 'Ten',
    list_id: '200',
    cards: [
      { content: 'Hey', card_id: '201', pos: 1 },
      { content: 'Hi', card_id: '202', pos: 2 },
      { content: 'Hello', card_id: '203', pos: 3 }
    ],
    pos: 2
  },
  {
    title: 'When',
    list_id: '300',
    cards: [
      { content: 'Hey', card_id: '301', pos: 1 },
      { content: 'Hi', card_id: '302', pos: 2 },
      { content: 'Hello', card_id: '303', pos: 3 }
    ],
    pos: 3
  }
];

const Store = createContext(initialState);
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};

export { Store, StateProvider };
