import React from 'react';
import Container from './components/Container';
import Banner from './components/Banner/Banner';
import { StateProvider } from './StateProvider';
// import { createClient, Provider } from 'urql';

// const client = createClient({
//   url: 'https://mkfwnbx5y5.execute-api.us-east-1.amazonaws.com/dev/graphql'
// });

export const App = () => {
  console.log('updated');
  return (
    <div className='App'>
      <StateProvider>
        <Banner />
        <Container />
      </StateProvider>
    </div>
  );
};
