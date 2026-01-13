'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import styles from "./ProfileHeader.module.css"
import Image from 'next/image.js';
import { useRouter } from 'next/navigation.js';

export default function ProfileHeader({profileUser, initialData}) {

    const { user } = useUser();
    const userId = user?.id;
    const pfp = initialData.pfp;
    const router = useRouter();

    const isOwnProfile = userId === profileUser;

    return (
        <div className={styles.header}>
            {pfp && (
                <Image
                src={pfp}
                alt="pfp"
                height={70}
                width={70}
                className={styles.pfp}
            />
            )}
            
            <div className={styles.details}>
                <p>{initialData.username}</p>
                <p>{initialData.bio}</p>
            </div>
            {isOwnProfile ? (
                <button onClick={() => router.push(`/profileview/editprofile`)}>Edit Profile</button>
            ) : (
                <div></div>
            )}
            
        </div>
    )
    
}
