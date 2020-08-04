import React, { useState } from "react"
import styles from "../css/Card.module.css"

const Card = () => {
  const [hovered, setHovered] = useState(false)
  const [modal, setModal] = useState(false)
  return (
    <div
      className={styles.component}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setModal(true)}
    >
      <span className={styles.maintext}>I am a Card. A very cool Card. </span>
      <span className={hovered ? styles.icon : ""} onClick={() => console.log("Delete")}></span>
      {modal && <div className={styles.minimodal}>I am a Card. A very cool Card.</div>}
    </div>
  )
}

export default Card
