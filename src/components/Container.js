import React from 'react';
import List from './List/List';
import Card from './Card/Card';
import ListTemplate from './List/ListTemplate';
import CardTemplate from './Card/CardTemplate';
import styles from './Container.module.css';
import { observer } from 'mobx-react';

const Container = observer(({ store }) => {
  let data = store.data;

  function addList(text) {
    //add some validations
    data.push({ title: text, cards: [] });
  }

  function addCard(...args) {
    let list_id = args[0];
    let content = args[1];
    data[list_id].cards.push({
      content: content
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
      {data.map((list, list_index) => {
        return (
          <>
            <List key={`List-${list_index}`} list={list} deleteList={() => deleteList(list_index)}>
              {list.cards.map((card, card_index) => {
                return (
                  <Card
                    key={`Card-${card_index}`}
                    list_id={list_index}
                    id={card_index}
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
});

export default Container;
