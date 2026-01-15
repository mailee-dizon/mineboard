'use client';
import React, { useState, useEffect } from 'react'
import styles from "./Post.module.css";
import { API_URL } from '../../../constants/api';
import { useUser } from '@clerk/nextjs';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react'
import { likePost } from './LikePost'; 
import Link from 'next/link';

export const Post = () => {
    const { isLoaded, user } = useUser();
    const [ post, setPost ] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ isLiked, setIsLiked ] = useState(false);
    const [ numLikes, setNumLikes ] = useState();
    const [ postUser, setPostUser ] = useState();
    
    const showPrev = () => {
        setCurrentIndex(prev => (prev === 0 ? post.images.length - 1 : prev - 1));
    };
    const showNext = () => {
        setCurrentIndex(prev => (prev === post.images.length-1 ? 0 : prev+1));
    };

    useEffect(() => {
        if (!isLoaded) return;
        const fetchData = async () => {
            const postRes = await fetch(`${API_URL}/posts/${user.id}`) // get post by user; TO DO: CHANGE BASED ON CATEGORIES/TITLE
            const postData = await postRes.json();
            const currentPost = postData[7]
            console.log("Post data: ", postData)
            setPost(currentPost); // hardcoded post index within users post[]; need to change 
            setNumLikes(currentPost.likes)

            const userRes = await fetch(`${API_URL}/users/id/${currentPost.userid}`) // get the user who created the post
            const userData = await userRes.json();
            console.log("User data: ", userData)
            setPostUser(userData[0]);

        }
        fetchData()
    }
        ,[isLoaded, user]
    )

  return (
    <div>
        {post && (
            <div className={styles.postContainer}>
                <div className={styles.imagesContainer}>
                    {post.images.length > 1 && (
                        <ArrowLeft onClick={showPrev} />
                    )}
                    <img
                        src={post.images.length > 1 ? post.images[currentIndex] : post.images[0]}
                        alt="post img"
                        className={styles.postImages}
                    />
                    {post.images.length > 1 && (
                        <ArrowRight onClick={showNext} />
                    )}
                </div>

                <div className={styles.rhsPost}>
                    {postUser&& (
                        <Link href={`/profileview/${postUser.userid}`}>
                            <div className={styles.userInfo}>
                                <img
                                    src={postUser.pfp}
                                    alt="user pfp"
                                    className={styles.pfpIcon}
                                />
                                <p>{postUser.username}</p>
                            </div>
                        </Link>
                    )}
                    <div className={styles.textBox}>
                        <h1>{post.title}</h1>
                        <p>{post.descript}</p>
                    </div>
                    <div className={styles.bottomElements}>
                        <div className={styles.likeElements}>
                        <Heart 
                        onClick={() => 
                            likePost(
                                post.postid, 
                                { isLiked, setIsLiked, numLikes, setNumLikes, post }, 
                                { isLoaded, user }
                            )
                        }
                            fill={isLiked ? "black" : "none"}
                        />
                        <p>{numLikes}</p>
                        </div>
                        
                    <p>
                        {post.createdat && (() => {
                            const d = new Date(post.createdat); // reformatting the date (thanks chat)
                            const day = d.getUTCDate();
                            const ord = (day > 3 && day < 21) ? 'th' :
                                        day % 10 === 1 ? 'st' :
                                        day % 10 === 2 ? 'nd' :
                                        day % 10 === 3 ? 'rd' : 'th';

                            const month = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' }).format(d);
                            const year = d.getUTCFullYear();
                            return `${month} ${day}${ord}, ${year}`;
                        })()}
                    </p>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}
