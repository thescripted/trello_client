import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import styles from './Card.module.css';

const Modal = ({ card, setModal }) => {
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
          onChange={e => (card.content = e.target.value)} //TODO: Expose API from state to do this function.
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
};

export default Modal;
