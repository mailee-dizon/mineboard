'use client'
import React, { useEffect, useState } from "react";
import styles from "./LoginButton.module.css";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const LoginButton = ({ initialData }) => {
    const { isSignedIn, user } = useUser();
    const userId = user?.id;
    const pfp = initialData?.pfp
    const router = useRouter()

    if (!isSignedIn || !user){
        return (
            <SignInButton mode="modal">
                <button className={styles.loginButton}>Login</button>
            </SignInButton>
        )
    }
    
 

    return(
        <button className={styles.loginButton} onClick={() => router.push(`/profileview/${userId}`)}>
            {pfp ? (
                <div >
                    <Image
                    src={pfp}
                    alt="Profile Picture"
                    width={40}
                    height={40}
                    className={styles.pfp}
                />
                </div>
                
            ) : (
                <div></div>
            )}
        </button>
    );
}
/*

*/