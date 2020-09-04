import React from 'react';
import styles from './List.module.css';

const List = ({ children, list, updateList, deleteList }) => {
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
              updateList(e);
            }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.target.blur(); // Remove Focus
              }
            }}
          ></textarea>
          <span className={styles.icon} onClick={deleteList}></span>
        </div>
        <div className={styles.cardContainer}>{children[0]}</div>
        {children[1]}
      </div>
    </div>
  );
};

export default List;
