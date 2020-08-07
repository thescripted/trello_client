import React from 'react';
import { observer } from 'mobx-react';
import Container from './components/Container';
import Banner from './components/Banner';

export const App = observer(({ store }) => {
  window.store = store;
  return (
    <div className='App'>
      <Banner />
      <Container />

      {/* <header className='App-header'>
        {store.data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        <button onClick={() => store.data.push("Thing")}> Add "Thing" </button>
      </header> */}
    </div>
  );
});
