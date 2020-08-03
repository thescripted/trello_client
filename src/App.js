import React from "react"
import { observer } from "mobx-react"
import Card from "./components/Card"
import List from "./components/List"

export const App = observer(({ store }) => {
  window.store = store
  return (
    <div className='App'>
      <header className='App-header'>
        {store.data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        <button onClick={() => store.data.push("Thing")}> Add "Thing" </button>
        <List />
      </header>
    </div>
  )
})
