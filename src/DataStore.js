// DataStore. This is the location of all the lists & cards that is passed down to react components for rendering.
// The API here will fetch data from the database and perform asynchronous operations upon Update, Delete, and Modifying card information.
import { observable, autorun } from "mobx"

class DataStore {
  data = observable([]) // ListArray = Array< Array<Cards> >

  constructor() {
    this.data.push("Hello", "World")
    autorun(() => console.log(this.numberOfLists))
  }

  get numberOfLists() {
    return this.data.length
  }
}

export const dataStore = new DataStore()
