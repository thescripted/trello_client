import React, { useContext, useEffect } from 'react';
import List from './List/List';
import Card from './Card/Card';
import ListTemplate from './List/ListTemplate';
import CardTemplate from './Card/CardTemplate';
import styles from './Container.module.css';
import { Store } from '../StateProvider';

const Container = () => {
  const { state, dispatch } = useContext(Store);

  const data = [];
  function addList(text) {
    dispatch({ type: 'ADD_LIST', value: text });
  }

  function addCard(list_id, content) {
    console.log();
    dispatch({ type: 'ADD_CARD', id: list_id, content: content });
  }

  function updateList(list_id, e) {
    dispatch({ type: 'UPDATE_LIST', value: e.target.value, id: list_id });
  }

  function deleteList(list_id) {
    dispatch({ type: 'DELETE_LIST', id: list_id });
  }

  function deleteCard(list_id, card_id) {
    dispatch({ type: 'DELETE_CARD', id: list_id, card_id: card_id });
  }

  return (
    <div className={styles.listContainer}>
      {state
        .slice() // Immer: Presevere immutability to read-only states by creating a copy
        .sort(function (a, b) {
          return a.pos - b.pos;
        })
        .map((list, list_idx) => {
          return (
            <>
              <List
                key={`List${list_idx}_${list.list_id.slice(0, 8)}`}
                list={list}
                updateList={updateList.bind(this, list.list_id)}
                deleteList={() => deleteList(list.list_id)}
              >
                {list.cards
                  .slice() // Immer: Presevere immutability to read-only states by creating a copy
                  .sort(function (a, b) {
                    return a.pos - b.pos;
                  })
                  .map((card, card_idx) => {
                    return (
                      <Card
                        key={`Card${card_idx}_${card.card_id.slice(0, 8)}`} // This might not be universally unique ):
                        list_id={list.list_id}
                        card={card}
                        deleteCard={() => deleteCard(list.list_id, card.card_id)}
                      />
                    );
                  })}
                <CardTemplate addCard={addCard.bind(this, list.list_id)} />
              </List>
            </>
          );
        })}
      <ListTemplate data={data} addList={addList} />
    </div>
  );
};

export default Container;
