import React, { useState, useEffect, useRef } from 'react';
import styles from './List.module.css';

const ListTemplate = ({ addList }) => {
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

  function adder() {
    addList(text);
    setText('');
    setGenerate(false);
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
              placeholder='Enter a value for this list...'
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.target.blur(); // Remove Focus
                  adder();
                }
              }}
              rows={2}
            ></textarea>
          </div>
          <div className={styles.selection}>
            <button className={`${styles.button} ${styles.primarybutton}`} onClick={adder}>
              Add List
            </button>
            <button className={`${styles.button} ${styles.cancelbutton}`}>Cancel</button>
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
};

export default ListTemplate;
