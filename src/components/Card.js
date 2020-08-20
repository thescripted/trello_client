import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import styles from '../css/Card.module.css';

export const CardTemplate = observer(({ list_ref }) => {
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

  function addCard() {
    //TODO: Validate Card before submission
    list_ref.cards.push({ content: text });
    setText('');
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
                addCard();
              }
            }}
            rows={3}
          ></textarea>
        </div>
      </div>
      <div className={styles.selection}>
        <button className={`${styles.button} ${styles.primarybutton}`} onClick={addCard}>
          Add Card
        </button>
        <button className={`${styles.button} ${styles.cancelbutton}`}>Delete Card</button>
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

const Modal = observer(({ card, setModal }) => {
  const ref = useRef(null);

  // Focuses on the modal container & highlights the contained text.
  useEffect(function () {
    ref.current.focus();
    ref.current.select();
  }, []);

  return (
    <div id='modal' className={`${styles.modalContainer} ${styles.newCardContainer}`}>
      <div className={styles.textContainer}>
        <textarea
          ref={ref}
          id='text'
          className={styles.textarea}
          value={card.content}
          onChange={e => (card.content = e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              e.target.blur(); // Remove Focus
              setModal(false);
            }
          }}
          rows={4}
        ></textarea>
      </div>
    </div>
  );
});

const Card = observer(({ card, id, deleteCard }) => {
  const [hovered, setHovered] = useState(false);
  const [modal, setModal] = useState(false);

  const removeModal = e => {
    if (
      e.target !== document.getElementById('modal') &&
      e.target !== document.getElementById('text')
    ) {
      setModal(false);
    }
  };

  useEffect(() => {
    if (modal) {
      window.addEventListener('click', removeModal);
    }
    return () => {
      window.removeEventListener('click', removeModal);
      // setModal(false);
    };
  }, [modal]);

  // Ensures modal will not fire if card has been deleted.

  return (
    <div
      className={styles.component}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setModal(true);
      }}
    >
      <span className={styles.maintext}>{card.content}</span>
      <span className={hovered ? styles.icon : ''} onClick={() => deleteCard(id)}></span>
      {modal && <Modal card={card} setModal={setModal} />}
    </div>
  );
});

export default Card;
