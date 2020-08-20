// DataStore. This is the location of all the lists & cards that is passed down to react components for rendering.
// The API here will fetch data from the database and perform asynchronous operations upon Update, Delete, and Modifying card information.
import { observable } from 'mobx';

// const client = createClient({
//   url: 'https://mkfwnbx5y5.execute-api.us-east-1.amazonaws.com/dev/graphql'
// });

class DataStore {
  data = observable([
    { title: 'Ben', cards: [{ content: 'Hey' }, { content: 'Hi' }, { content: 'Hello' }] },
    { title: 'Ten', cards: [{ content: 'Hey' }, { content: 'Hi' }, { content: 'Hello' }] },
    { title: 'When', cards: [{ content: 'Hey' }, { content: 'Hi' }, { content: 'Hello' }] }
  ]); // ListArray = Array< Array<Cards> >
}
export const dataStore = new DataStore();
