import React, { useState } from "react"
import styles from "../css/Card.module.css"

const Card = () => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={styles.component}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.maintext}>
        I am a Card. am a Card. am a Card. am a Card. am a Card. am a Card. am a Card. am a Card.
      </span>
      <span
        className={hovered ? styles.icon : styles.iconspace}
        onClick={() => console.log("Delete")}
      ></span>
    </div>
  )
}

export default Card
