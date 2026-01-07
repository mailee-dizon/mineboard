import React from 'react'
import styles from "./SignUpContainer.module.css";
/* 
    Need to add to AuthContext: when we click Sign Up all info regarding the user
    -> sent to backend and added to database. User also logged in. 
*/

export const SignUpContainer = () => {
  return (
    <div className={styles.mainBox}>
      <div className={styles.subMainBox}>
        <h1 className={styles.header}>Mineboard</h1>

        <input className={styles.inputBox}
          placeholder='Mobile Number or Email'
        />
        <input className={styles.inputBox}
          placeholder='Full Name'
        />
        <input className={styles.inputBox}
          placeholder='Username'
        />
        <input className={styles.inputBox}
          placeholder='Password'
        />

        <button className={styles.signUp}>Sign Up</button>

      </div>
    </div>
  )
}
