'use client';
import React, { useState } from 'react'
import styles from "./CreatePost.module.css";
import { UploadImages } from './UploadImages';
import Select from 'react-select';
import { useUser } from '@clerk/nextjs';
import { API_URL } from '../../../constants/api';

// temporary 'categories' for frontend purposes
const options = [
    {value: "interior", label: "Interior"},
    {value: "exterior", label: "Exterior"},
    {value: "castle", label: "Castle"},
    {value: "house", label: "House"},
    {value: "furniture", label: "Furniture"},
    ];

export const CreatePost = () => {
    const { isSignedIn, user } = useUser();
    const [title, setTitle] = useState("");
    const [descript, setDescript] = useState("");
    const [images, setImages] = useState([]);
    
    // TO DO: implement categories
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSumbit = async () => {
        const imageUrls = images.map(img => img.url);
        // TO DO: implement categories
        // const categoryValues = selectedCategories.map(c => c.value)

        try {
            const res = await fetch(`${API_URL}/posts`, {
                method: "POST", 
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify ({
                    userId: user.id,
                    title, 
                    descript,
                    images: imageUrls,
                    // categories: []
                })
            });
            if (!res.ok) {
                throw new Error("Failed to create post");
            }
            // reset all fields
            setTitle("");
            setDescript("");
            setImages([]);
            setSelectedCategories([]);
            alert("Post created!");
        }
        catch (err){
            console.log(err);
        }

    };
    if (!isSignedIn){
        return (
            <div className={styles.notSignedIn}>
                <p>Sign in to post!</p>
            </div>
        )
    }

    return (
    <div className={styles.mainCreateBox} >
        <UploadImages images={images} setImages={setImages}/>
        <div className={styles.subCreateBox}>
            <input 
                className={styles.inputBox}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input 
                className={styles.inputBox}
                placeholder="Description"
                value={descript}
                onChange={(e) => setDescript(e.target.value)}
            />
            <Select // TO DO: finish implementing categories
                isMulti='true'
                options={options}
                value={selectedCategories}
                onChange={setSelectedCategories}
                className={styles.inputBox}
                
            />
            <div className={styles.postSubmitBox}>
                <button onClick={handleSumbit} className={styles.postSubmit}>
                    Post
                </button>
            </div>
        </div>
    </div>
)
}
