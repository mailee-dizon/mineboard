'use client';
import React, { useState, FormEvent } from 'react'
import styles from "./LoginContainer.module.css";
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import { SignIn } from '@clerk/nextjs';

// IGNORE!!!!!!! Changed login to modal (no extra page); see loginButton in TopBar. Keeping this in case needed later

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
