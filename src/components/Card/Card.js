import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import styles from './Card.module.css';
import Modal from './Modal';

const Card = observer(({ card, deleteCard }) => {
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
      <span className={hovered ? styles.icon : ''} onClick={deleteCard}></span>
      {modal && <Modal card={card} setModal={setModal} />}
    </div>
  );
});

export default Card;
