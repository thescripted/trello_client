import React from 'react';
import styles from '../css/List.module.css';
import Card, { CardTemplate } from './Card';
import { observer } from 'mobx-react';

function NewList() {
  return (
    <div className={styles.newList}>
      <span className={styles.plusIcon}></span>
      <p>Add Another List</p>
    </div>
  );
}

const List = observer(({ generator, list, id, deleteList }) => {
  generator ? console.log(' ') : console.log(list.cards);

  function deleteCard(card_index) {
    list.cards.splice(card_index, 1);
  }

  return generator ? (
    <NewList />
  ) : (
    <div className={styles.listLayoutContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          {/* Does not yet support auto resizing*/}
          <textarea
            className={styles.textarea}
            rows={1}
            value={list.title}
            onChange={e => {
              list.title = e.target.value;
            }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.target.blur(); // Remove Focus
              }
            }}
          ></textarea>
          <span className={styles.icon} onClick={() => deleteList(id)}></span>
        </div>
        <div className={styles.cardContainer}>
          {list.cards.map((card, index) => (
            <Card key={`Card-${index}`} id={index} card={card} deleteCard={deleteCard} />
          ))}
        </div>
        <CardTemplate />
      </div>
    </div>
  );
});

export default List;
