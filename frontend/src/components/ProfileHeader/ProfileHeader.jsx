'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import styles from "./ProfileHeader.module.css"
import Image from 'next/image.js';
import { useRouter } from 'next/navigation.js';
import { minecraftFont } from '@/app/fonts';

export default function ProfileHeader({profileUser, initialData}) {

    const { user } = useUser();
    const userId = user?.id;
    const pfp = initialData.pfp;
    const router = useRouter();

    const isOwnProfile = userId === profileUser;

    return (
        <div className={styles.container}>
            <div className={styles.headerDetails}>
                <div className={styles.profileDetails}>
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
                        <p>{initialData.firstname} {initialData.lastname}</p>
                        <p>{initialData.username}</p>
                        <p>{initialData.bio}</p>
                    </div>
                </div>
                <div className={styles.profileDetails2}>
                    <div className={styles.followDetails}>
                        <p id='followers'>0</p>
                        <p>Followers</p>
                    </div>
                    <div className={styles.followDetails}>
                        <p id='following'>0</p>
                        <p>Following</p>
                    </div>
                </div>
            </div>
            {isOwnProfile ? (
                <div className={styles.editButtonContainer}>
                    <button onClick={() => router.push(`/profileview/editprofile`)} className={`${styles.editButton} ${minecraftFont.className}`}>Edit Profile</button>
                </div>
            ) : (
                <div></div>
            )}
            
        </div>
    )
    
}
