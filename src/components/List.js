import React from 'react';
import styles from '../css/List.module.css';
import Card from './Card';
import { observer } from 'mobx-react';

const List = observer(({ generator, list, id, onDelete }) => {
  generator ? console.log(' ') : console.log(list.cards);
  function newList() {
    return (
      <div className={styles.newList}>
        <span className={styles.plusIcon}></span>
        <p>Add Another List</p>
      </div>
    );
  }

  return generator ? (
    newList()
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
          <span className={styles.icon} onClick={() => onDelete(id)}></span>
        </div>
        <div className={styles.cardContainer}>
          {list.cards.map((card, index) => (
            <Card key={`Card-${index}`} id={index} card={card} />
          ))}
        </div>
        <div className={styles.listFooter}>
          <button className={styles.newCardButton}>
            <span className={styles.plusIcon}></span>
            <p>Add Another Card</p>
          </button>
        </div>
      </div>
    </div>
  );
});

export default List;
