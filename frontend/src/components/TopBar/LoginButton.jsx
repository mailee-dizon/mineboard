'use client'
import React from "react";
import styles from "./LoginButton.module.css";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const LoginButton = ({ initialData, userId }) => {
    const pfp = initialData?.pfp
    const router = useRouter()

    if (!userId){
        return (
            <SignInButton mode="modal">
                <button className={styles.loginButton}>Login</button>
            </SignInButton>
        )
    }

    return(
        <button className={styles.pfpButton} onClick={() => router.push(`/profileview/${userId}`)}>
            {pfp ? (
                <div>
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