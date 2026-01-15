'use client';
import React, { useState, useEffect } from 'react'
import styles from "./Post.module.css";
import { API_URL } from '../../../constants/api';
import { useUser } from '@clerk/nextjs';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react'
import { likePost } from './LikePost'; 

export const Post = () => {
    const { isLoaded, user } = useUser();
    const [ post, setPost ] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ isLiked, setIsLiked ] = useState(false);
    const [ numLikes, setNumLikes ] = useState();
    
    const showPrev = () => {
        setCurrentIndex(prev => (prev === 0 ? post.images.length - 1 : prev - 1));
    };
    const showNext = () => {
        setCurrentIndex(prev => (prev === post.images.length-1 ? 0 : prev+1));
    };

    useEffect(() => {
        if (!isLoaded) return;
        const getPost = async () => {
            const res = await fetch(`${API_URL}/posts/${user.id}`) // get post by user; TO DO: CHANGE BASED ON CATEGORIES/TITLE
            const data = await res.json();
            console.log(data)
            setPost(data[7]); // hardcoded post index within users post[]; need to change 
            console.log(data[7])
            setNumLikes(data[7].likes)

        }
        getPost()
    }
        ,[isLoaded, user]
    )

  return (
    <div>
        {post && (
            <div className={styles.postContainer}>
                <div className={styles.imagesContainer}>
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
                </div>
                <div className={styles.textBox}>
                    <h1 className={styles.postTitle}>{post.title}</h1>
                    <p className={styles.postDescription}>{post.descript}</p>
                </div>
                <div className={styles.bottomElements}>
                <Heart 
                    onClick={() => likePost(
                        post.postid, 
                        { isLiked, setIsLiked, numLikes, setNumLikes }, 
                        { isLoaded, user }
                    )}
                    fill={isLiked ? "black" : "none"}
                />
                <p>{numLikes}</p>
                </div>
            </div>
        )}
    </div>
  )
}
