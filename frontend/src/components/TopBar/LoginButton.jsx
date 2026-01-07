import React from "react";
import styles from "./LoginButton.module.css";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export const LoginButton = () => {
    const { isSignedIn } = useUser()
    
    if (isSignedIn){
        return(
            <SignOutButton redirectUrl="/home">
                <button className={styles.loginButton}>Sign Out</button>
            </SignOutButton> // to be changed to pfp icon
        );
    }
    
    return (
        <SignInButton mode="modal">
            <button className={styles.loginButton}>Login</button>
        </SignInButton>
    )
}