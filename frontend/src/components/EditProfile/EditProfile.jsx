'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import styles from "./EditProfile.module.css"
import { minecraftFont } from '@/app/fonts';
import { useUser } from '@clerk/nextjs';
import { API_URL } from '../../../constants/api';

export default function EditProfile({ initialData }) {
    const { user } = useUser()

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [pfp, setPfp] = useState(initialData.pfp)

    const handlePfpChange = async (file) => {
        if (!user || !file) return

        try {
            setPfp(URL.createObjectURL(file))

            const formData = new FormData()

            formData.append("pfp", file);

            await fetch(`https://api.clerk.com/v1/users/${user.id}`, {
                method: "PATCH",
                headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_KEY}`,
                },
                body: formData,
            });

            await fetch(`${API_URL}/users/${user}`, {
                method: "PUT",
                body: JSON.stringify({
                    pfp: formData
                })
            })

        } catch (error) {
            
        }

    }

    return (
        <div className={styles.changeContainer}>
            <div className={styles.imageContainer}>
                <Image
                    src={pfp}
                    alt={"profile picture"}
                    width={70}
                    height={70}
                    className={styles.pfp}
                />
                <input
                    type="file"
                    accept="image/*"
                    id='file'
                    className={styles.inputImage}
                    onChange={(e) => {
                        const file = e.target.files[0]
                        
                        handlePfpChange(file);
                    }}
                />
                <label htmlFor="file" className={styles.changeButton}>Change Picture</label>
            </div>
            <div className={styles.infoContainer}>
                <h3>Username</h3>
                <input
                    type="text"
                    placeholder={initialData.username}
                    className={`${styles.input} ${minecraftFont.className}`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <h3>First Name</h3>
                <input
                    type="text"
                    placeholder={initialData.firstName || "Enter First Name"}
                    className={`${styles.input} ${minecraftFont.className}`}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <h3>Last Name</h3>
                <input
                    type="text"
                    placeholder={initialData.firstName || "Enter Last Name"}
                    className={`${styles.input} ${minecraftFont.className}`}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <h3>Bio</h3>
                <input
                    type="text"
                    placeholder={initialData.bio || "Enter Bio"}
                    className={`${styles.input} ${minecraftFont.className}`}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <br/>
                <button className={styles.saveButton}>Save</button>
            </div>
        </div>
    );
}
