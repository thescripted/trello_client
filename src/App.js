import React from 'react';
import Container from './components/Container';
import Banner from './components/Banner/Banner';
import { dataStore } from './DataStore';

export const App = () => {
  return (
    <div className='App'>
      <Banner />
      <Container store={dataStore} />
    </div>
  );
};
