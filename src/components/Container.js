import React, { useContext, useEffect } from 'react';
import List from './List/List';
import Card from './Card/Card';
import ListTemplate from './List/ListTemplate';
import CardTemplate from './Card/CardTemplate';
import styles from './Container.module.css';
import { useQuery } from 'urql';
import { Store } from '../StateProvider';

const Container = () => {
  const { state, dispatch } = useContext(Store);
  useEffect(function () {
    dispatch({ type: 'ADD_CARD' });
  }, []);
  const data = [];
  console.log(state);
  function addList(text) {
    //add some validation
    data.push({ title: text, cards: [], id: data.length * 100 });
  }

  function addCard(...args) {
    let list_id = args[0];
    let content = args[1];
    data[list_id].cards.push({
      content: content,
      id: data[list_id].cards.length + list_id * 100
    });
  }

  function deleteList(list_index) {
    data.splice(list_index, 1);
  }

  function deleteCard(list_index, card_index) {
    data[list_index].cards.splice(card_index, 1);
  }
  return (
    <div className={styles.listContainer}>
      {data
        .slice() // [mobx]: Sort the array on a copy rather than the datastore
        .sort(function (a, b) {
          return a.pos - b.pos;
        })
        .map((list, list_index) => {
          return (
            <>
              <List key={list.id} list={list} deleteList={() => deleteList(list_index)}>
                {list.cards
                  .sort(function (a, b) {
                    return a.pos - b.pos;
                  })
                  .map((card, card_index) => {
                    return (
                      <Card
                        key={`Card-${card.id}`}
                        list_id={list_index}
                        card={card}
                        deleteCard={() => deleteCard(list_index, card_index)}
                      />
                    );
                  })}
                <CardTemplate addCard={addCard.bind(this, list_index)} />
              </List>
            </>
          );
        })}
      <ListTemplate data={data} addList={addList} />
    </div>
  );
};

export default Container;
