import React from 'react';
import Container from './components/Container';
import Banner from './components/Banner';
import { dataStore } from './DataStore';

export const App = () => {
  return (
    <div className='App'>
      <Banner />
      <Container store={dataStore} />

      {/* <header className='App-header'>
        {store.data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        <button onClick={() => store.data.push("Thing")}> Add "Thing" </button>
      </header> */}
    </div>
  );
};
