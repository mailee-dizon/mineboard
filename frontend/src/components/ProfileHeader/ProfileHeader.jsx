'use client';
import React, { useEffect, useState } from 'react';
import { SignOutButton, useUser } from '@clerk/nextjs';
import styles from "./ProfileHeader.module.css"
import Image from 'next/image.js';
import { useRouter } from 'next/navigation.js';
import { minecraftFont } from '@/app/fonts';
import { API_URL } from '../../../constants/api';

export default function ProfileHeader({profileUser, initialData}) {
    
    const { user } = useUser();
    const userId = user?.id;
    const pfp = initialData.pfp;
    const router = useRouter();
    const [following, setFollowing] = useState();
    const [loading, setLoading] = useState(true);

    const isOwnProfile = userId === profileUser;

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const res = await fetch(`${API_URL}/follows/${profileUser}`)
                const data = await res.json()

                const isFollowing = data.some(
                    (f) => f.follower_userid === userId
                )

                setFollowing(isFollowing)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching the following: ", error);
            } finally {
                setLoading(false);
            }
        }

        if (userId) fetchFollowing()
    }, [userId, profileUser])

    const handleFollow = async () => {
        if (userId === profileUser) return

        if (following) {
            try {
                const res = await fetch(`${API_URL}/follows/${profileUser}/${userId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if (res.ok) {
                    setFollowing(!following)
                }
                console.log("STATUS: ", res.status)

            } catch (error) {
                console.error("Error unfollowing: ", error)
            }
        } else {
            try {
                const res = await fetch(`${API_URL}/follows/${profileUser}/${userId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (res.ok) {
                    setFollowing(!following)
                }
                console.log("STATUS: ", res.status)
                
            } catch (error) {
                console.error("Error following user: ", error)
            }
        }
    }


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
                <div className={styles.buttonsInline}>
                    <div className={styles.editButtonContainer}>
                        <button onClick={() => router.push(`/profileview/editprofile`)} className={`${styles.editButton} ${minecraftFont.className}`}>Edit Profile</button>
                    </div>
                    <div className={styles.editButtonContainer}>
                        <SignOutButton redirectUrl="/home">
                            <button className={`${styles.editButton} ${minecraftFont.className}`}>Log Out</button>
                        </SignOutButton>
                    </div>
                </div>
            ) : (
                <div className={styles.buttonsInline}>
                    <div className={styles.editButtonContainer}>
                        <button className={`${styles.editButton} ${minecraftFont.className}`} onClick={() => {handleFollow()}}>{following ? (<p>unfollow</p>) : (<p>follow</p>)}</button>
                    </div>
                </div>
            )}
            
        </div>
    )
    
}
