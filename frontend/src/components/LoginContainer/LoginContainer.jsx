'use client';
import React, { useState } from 'react'
import styles from "./LoginContainer.module.css";
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';


/* For username/password, we need to check 
  A) that they exist in context of each other ( username exists + password matches )
  B) that they are filled in before clicking login -> else ERR Message
  
  This means we need to check username/password to backend AND
  AuthContext (once logged in, we need to keep track of what user is logged in using unique data)

  ONCLICK of LoginAccount, check the above conditions -> setUser(user) (we get user by connecting to backend using username/password combo) + setLoggedIn(true)
*/

/*
  LATER IMPLEMENTATION: 
    - forgot password
    - login with gmail/facebook/etc 
*/
export const LoginContainer = () => {
    const {user, setUser, isLoggedIn, setIsLoggedIn} = useAuth()
    const router = useRouter();

    const logIn = (e) => {
        e.preventDefault()
        setIsLoggedIn(true)
          setUser({
              name: "John Doe"
          })
          router.push('/');
        }
  
  return (
    <div className={styles.mainBox}>
      <div className={styles.subMainBox}>
        <h1 className={styles.header}>Mineboard</h1>

        <input className={styles.inputBox}
          placeholder='Username'
        />
        <input className={styles.inputBox}
          placeholder='Password'
        />

        <button className={styles.loginAccount} onClick={logIn}>Login</button>

        <div className={styles.signUpText}>
          <p>Don't have an account?</p>
          <Link href="/signup" className={styles.signUpLink}>Sign Up</Link>
        </div>

      </div>
    </div>
  )
}
