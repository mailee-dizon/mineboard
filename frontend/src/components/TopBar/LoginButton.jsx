import React from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./LoginButton.module.css";
import Link from "next/link";

export const LoginButton = () => {
    const {user, setUser, isLoggedIn, setIsLoggedIn} = useAuth()
    const logIn = (e) => {
        e.preventDefault()
        setIsLoggedIn(true)
        setUser({
            name: "John Doe"
        })
    }
    
    if (isLoggedIn){
        return(
            <button className={styles.loginButton}>Logged In</button>
        );
    }
    
    return (
            <Link href="/login">
                <button className={styles.loginButton}>Login</button>
            </Link> 
    )
}