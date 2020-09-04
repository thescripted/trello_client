import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import styles from './Card.module.css';

const CardTemplate = observer(({ addCard }) => {
  const [generate, setGenerate] = useState(false);
  const [text, setText] = useState('');
  const newCardRef = useRef(null);

  const removeCardTemplate = e => {
    if (
      e.target !== document.getElementById('newCard') &&
      e.target !== document.getElementById('newText') &&
      e.target !== document.getElementById('text')
    ) {
      setGenerate(false);
    }
  };

  function adder() {
    addCard(text);
    setText('');
    setGenerate(false);
  }

  useEffect(
    function () {
      if (generate) {
        newCardRef.current.focus();
        window.addEventListener('click', removeCardTemplate);
      }
      return () => {
        window.removeEventListener('click', removeCardTemplate);
      };
    },
    [generate]
  );

  return generate ? (
    <>
      <div id='newCard' className={styles.newCardContainer}>
        <div id='newText' className={styles.textContainer}>
          <textarea
            id='text'
            ref={newCardRef}
            className={styles.textarea}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='Enter a value for this card...'
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.target.blur(); // Remove Focus
                adder();
              }
            }}
            rows={3}
          ></textarea>
        </div>
      </div>
      <div className={styles.selection}>
        <button className={`${styles.button} ${styles.primarybutton}`} onClick={adder}>
          Add Card
        </button>
        <button className={`${styles.button} ${styles.cancelbutton}`}>Cancel</button>
      </div>
    </>
  ) : (
    <div className={styles.listFooter}>
      <button
        className={styles.newCardButton}
        onClick={() => {
          setGenerate(true);
        }}
      >
        <span className={styles.plusIcon}></span>
        <p>Add Another Card</p>
      </button>
    </div>
  );
});

export default CardTemplate;
