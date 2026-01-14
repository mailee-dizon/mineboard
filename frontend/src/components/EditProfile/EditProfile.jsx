'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import styles from "./EditProfile.module.css"
import { minecraftFont } from '@/app/fonts';
import { useUser } from '@clerk/nextjs';
import { API_URL } from '../../../constants/api';
import { uploadImages } from './UploadImages';
import { useRouter } from 'next/navigation';

export default function EditProfile({ initialData }) {
    const { user } = useUser()
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [pfp, setPfp] = useState(initialData.pfp)

    const handlePfpChange = async (file) => {
        if (!user || !file) return

        try {

            const imageUrl = await uploadImages(user.id, file);
            console.log("ImageUrl: ", imageUrl)

            const res = await fetch(`${API_URL}/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pfp: imageUrl
                })
            })
            setPfp(imageUrl)
            const data = await res.json()
            console.log("Uploaded file: ", data);

        } catch (error) {
            console.error("Error uploading pfp: ", error);
        }
    }

    const updateProfile = async () => {
        if (!user) return
        try {
            const response = await fetch(`${API_URL}/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    bio: bio
                })
            })
            
            if (!response.ok) {
                const errText = await response.text()
                throw new Error(errText)
            }
            router.push(`/profileview/${user.id}`)

        } catch (error) {
            console.error("Error updating profile: ", error)
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
                    placeholder={initialData.firstname || "Enter First Name"}
                    className={`${styles.input} ${minecraftFont.className}`}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <h3>Last Name</h3>
                <input
                    type="text"
                    placeholder={initialData.lastname || "Enter Last Name"}
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
                <div className={styles.buttonContainer}>
                    <button className={`${styles.saveButton} ${minecraftFont.className}`} onClick={updateProfile}>Save</button>
                </div>
            </div>
        </div>
    );
}
