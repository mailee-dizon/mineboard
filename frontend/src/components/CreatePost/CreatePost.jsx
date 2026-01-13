'use client';
import React, { useState } from 'react'
import Select from 'react-select';
import styles from "./CreatePost.module.css";
import { API_URL } from '../../../constants/api';
import { SelectFiles } from './SelectFiles';
import { uploadImages } from './UploadImages';
import { useUser } from '@clerk/nextjs';

// temporary 'categories' for frontend purposes
const options = [
    {value: "interior", label: "Interior"},
    {value: "exterior", label: "Exterior"},
    {value: "castle", label: "Castle"},
    {value: "house", label: "House"},
    {value: "furniture", label: "Furniture"},
    ];

/**
    TO DO:
        handle errors (no title, no images selected)
        these 2 NEED a value, prompt little error msg
 */
export const CreatePost = () => {
    const { isSignedIn, user } = useUser();
    const [title, setTitle] = useState("");
    const [descript, setDescript] = useState("");
    const [images, setImages] = useState([]);
    
    // TO DO: implement categories
    const [selectedCategories, setSelectedCategories] = useState([]);

    const checkErrors = () =>{
        // if no errors, call handleSubmit; else prompt. 
    }
    const handleSumbit = async () => {
        // TO DO: implement categories
        // const categoryValues = selectedCategories.map(c => c.value)
        try {
            
            // stores local images (FileObjects) -> firebase
            // converted to firebaseURLs that can be accessed globally now
            const firebaseUrls = await uploadImages(images);
            const res = await fetch(`${API_URL}/posts`, {
                method: "POST", 
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify ({
                    userId: user.id,
                    title, 
                    descript,
                    images: firebaseUrls,
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
        <SelectFiles images={images} setImages={setImages}/>
        <div className={styles.subCreateBox}>
            <input 
                className={styles.inputBox}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
                    className={`${styles.inputBox} ${styles.descriptionBox}`}
                    placeholder="Description"
                    rows={6}
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
                <button onClick={handleSumbit} className={styles.postSubmitButton}>Post</button>
            </div>
        </div>
    </div>
)
}
