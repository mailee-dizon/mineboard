import React from 'react'
import styles from "./Category.module.css";

export const Category = ({category}) => {
  return (
    <div className={styles.categoryContainer}>
        <p>{category}</p>
    </div>
  )
}
