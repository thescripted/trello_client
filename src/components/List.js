import React from "react"
import styles from "../css/List.module.css"
import Card from "./Card"

const List = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.listContainer}>
        {/* Does not yet support auto resizing*/}
        <textarea
          className={styles.textarea}
          rows={1}
          defaultValue='Georgia Tech Sucks'
          onKeyPress={e => {
            if (e.key === "Enter") {
              e.target.blur() // Remove Focus
            }
          }}
        ></textarea>
        <span className={styles.icon}></span>
      </div>
      <div className={styles.cardContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className={styles.listFooter}>
        <button className={styles.newCardButton}>
          <span className={styles.plusIcon}></span>
          <p>Add Another Card</p>
        </button>
      </div>
    </div>
  )
}

export default List
