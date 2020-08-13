import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import styles from '../css/Card.module.css';

const Modal = observer(({ card, setModal }) => {
  console.log(card);
  return (
    <div id='modal' className={styles.modalContainer}>
      <div className={styles.textContainer}>
        <textarea
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

const Card = observer(({ card, id }) => {
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
    return () => window.removeEventListener('click', removeModal);
  }, [modal]);

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
      <span className={hovered ? styles.icon : ''} onClick={() => console.log('Delete')}></span>
      {modal && <Modal card={card} setModal={setModal} />}
    </div>
  );
});

export default Card;
