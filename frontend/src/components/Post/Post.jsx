'use client';
import React, { useState, useEffect } from 'react'
import styles from "./Post.module.css";
import { API_URL } from '../../../constants/api';
import { useUser } from '@clerk/nextjs';
import { ArrowLeft, ArrowRight } from 'lucide-react'



export const Post = () => {
    const { isLoaded, user } = useUser();
    const [ post, setPost ] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const showPrev = () => {
        setCurrentIndex(prev => (prev === 0 ? post.images.length - 1 : prev - 1));
    };
    const showNext = () => {
        setCurrentIndex(prev => (prev === post.images.length-1 ? 0 : prev+1));
    };

    useEffect(() => {
        if (!isLoaded) return;
        const getPost = async () => {
            const res = await fetch(`${API_URL}/posts/${user.id}`) // get post by user
            const data = await res.json();
            console.log(data)
            setPost(data[8]); // hardcoded postid; need to change 
        }
        getPost()
    }
        ,[isLoaded, user]
    )

  return (
    <div>
        {post && (
            <div className={styles.postContainer}>
                {post.images.length <= 1 ? (
                    <img
                        src={post.images}
                        alt="post img"
                        className={styles.postImages}
                    />

                ) : (
                    <div className={styles.multipleSelections}>
                    
                        <ArrowLeft 
                            onClick={showPrev}    
                        />
                    
                    <img
                        src={post.images[currentIndex]} 
                        alt="preview"
                        className={styles.postImages}
                    />        
                        <ArrowRight 
                            onClick={showNext}    
                        />
                    
                    </div>
                )}
                
                <div className={styles.textBox}>
                    <h1 className={styles.postTitle}>{post.title}</h1>
                    <p className={styles.postDescription}>{post.descript}</p>
                </div>
            </div>
        )}
    </div>
  )
}
