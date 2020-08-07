import React from 'react';
import List from './List';
import styles from '../css/Container.module.css';

const Container = () => {
  return (
    <div className={styles.listContainer}>
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Container;
