import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/List.module.css';
import Card, { CardTemplate } from './Card';
import { observer } from 'mobx-react';

export const ListTemplate = observer(({ state_ref }) => {
  console.log(state_ref);
  const [generate, setGenerate] = useState(false);
  const [text, setText] = useState('');
  const newListRef = useRef(null);

  const removeListTemplate = e => {
    if (
      e.target !== document.getElementById('newListText') &&
      e.target !== document.getElementById('text')
    ) {
      setGenerate(false);
    }
  };

  function addList() {
    //TODO: Validate List before submission
    state_ref.push({ title: text, cards: [] });
    setText('');
  }

  useEffect(
    function () {
      if (generate) {
        newListRef.current.focus();
        window.addEventListener('click', removeListTemplate);
      }
      return () => {
        window.removeEventListener('click', removeListTemplate);
      };
    },
    [generate]
  );

  return generate ? (
    <>
      <div className={styles.listLayoutContainer}>
        <div className={styles.listContent}>
          <div id='newListText' className={styles.textContainer}>
            <textarea
              id='text'
              ref={newListRef}
              className={styles.textarea}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder='Enter a value for this card...'
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.target.blur(); // Remove Focus
                  addList();
                }
              }}
              rows={2}
            ></textarea>
          </div>
          <div className={styles.selection}>
            <button className={`${styles.button} ${styles.primarybutton}`} onClick={addList}>
              Add List
            </button>
            <button className={`${styles.button} ${styles.cancelbutton}`}>Delete List</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className={styles.newList} role='button' onClick={() => setGenerate(true)}>
      <span className={styles.plusIcon}></span>
      <p>Add Another List</p>
    </div>
  );
});

const List = observer(({ list, id, deleteList }) => {
  function deleteCard(card_index) {
    list.cards.splice(card_index, 1);
  }

  return (
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
        <CardTemplate list_ref={list} />
      </div>
    </div>
  );
});

export default List;
