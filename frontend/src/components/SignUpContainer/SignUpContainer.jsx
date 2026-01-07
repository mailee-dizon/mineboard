import React from 'react'
import styles from "./SignUpContainer.module.css";
import { API_URL } from '../../../constants/api';
/* 
    Need to add to AuthContext: when we click Sign Up all info regarding the user
    -> sent to backend and added to database. User also logged in. 


    If username not taken in users 
*/


export const SignUpContainer = () => {

  return (
    <div className={styles.mainBox}>
      <div className={styles.subMainBox}>
        <h1 className={styles.header}>Mineboard</h1>

        <input className={styles.inputBox}
          placeholder='Email'
        />
        <div className={styles.fullNameDiv}>
          <input className={styles.partialNameBox}
          placeholder='First Name'
          />
          <input className={styles.partialNameBox}
          placeholder='Last Name'
          />

        </div>
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
