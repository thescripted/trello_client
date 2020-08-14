import React from 'react';
import List from './List';
import styles from '../css/Container.module.css';
import { observer } from 'mobx-react';

const Container = observer(({ store }) => {
  let data = store.data;
  function deleteList(list_index) {
    data.splice(list_index, 1);
  }

  return (
    <div id='container' className={styles.listContainer}>
      {data.map((listItem, index) => (
        <List key={`List${index}`} list={listItem} id={index} onDelete={deleteList} />
      ))}
      <List generator={true} />
    </div>
  );
});

export default Container;
