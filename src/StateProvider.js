// DataStore. This is the location of all the lists & cards that is passed down to react components for rendering.
// The API here will fetch data from the database and perform asynchronous operations upon Update, Delete, and Modifying card information.
import React, { createContext, useReducer } from 'react';
const initialState = [
  {
    title: 'Ben',
    id: 100,
    cards: [
      { content: 'Hey', id: 101, pos: 1 },
      { content: 'Hi', id: 102, pos: 2 },
      { content: 'Hello', id: 103, pos: 3 }
    ],
    pos: 1
  },
  {
    title: 'Ten',
    id: 200,
    cards: [
      { content: 'Hey', id: 201, pos: 1 },
      { content: 'Hi', id: 202, pos: 2 },
      { content: 'Hello', id: 203, pos: 3 }
    ],
    pos: 2
  },
  {
    title: 'When',
    id: 300,
    cards: [
      { content: 'Hey', id: 301, pos: 1 },
      { content: 'Hi', id: 302, pos: 2 },
      { content: 'Hello', id: 303, pos: 3 }
    ],
    pos: 3
  }
];

const Store = createContext(initialState);

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'HEY':
        console.log('Hey: ', state);
        return [...state];
      case 'ADD_CARD':
        const newcardtext = 'Hello, World';
        const desiredList = state[0];
        return [...state];
      default:
        throw new Error();
    }
  }, initialState);

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};

export { Store, StateProvider };
