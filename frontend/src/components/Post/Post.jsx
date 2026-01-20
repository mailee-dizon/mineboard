'use client';
import React, { useState } from 'react'
import styles from "./Post.module.css";
import { useUser } from '@clerk/nextjs';
import { ArrowLeft, ArrowRight, Bookmark, Heart } from 'lucide-react'
import { likePost } from './LikePost'; 
import Link from 'next/link';

export const Post = ({ post, userData }) => {
    const { isLoaded, user } = useUser();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ isLiked, setIsLiked ] = useState(false);
    const [ numLikes, setNumLikes ] = useState(post.likes);
    
    const showPrev = () => {
        setCurrentIndex(prev => (prev === 0 ? post.images.length - 1 : prev - 1));
    };
    const showNext = () => {
        setCurrentIndex(prev => (prev === post.images.length-1 ? 0 : prev+1));
    };


  return (
    <div>
        {post && (
            <div className={styles.postContainer}>
                <div className={styles.imagesContainer}>
                    {post.images.length > 1 && (
                        <ArrowLeft onClick={showPrev} className={styles.arrowButton} size={60}/>
                    )}
                        <img
                            src={post.images.length > 1 ? post.images[currentIndex] : post.images[0]}
                            alt="post img"
                            className={styles.postImages}
                        />
                    {post.images.length > 1 && (
                        <ArrowRight onClick={showNext} className={styles.arrowButton} size={60} />
                    )}
                </div>

                <div className={styles.rhsPost}>
                        <Link href={`/profileview/${userData.userid}`}>
                            <div className={styles.userInfo}>
                                <img
                                    src={userData.pfp}
                                    alt="user pfp"
                                    className={styles.pfpIcon}
                                />
                                <p>{userData.username}</p>
                            </div>
                        </Link>
                    <div className={styles.textBox}>
                        <h1>{post.title}</h1>
                        <p>{post.descript}</p>
                    </div>
                    <div className={styles.bottomElements}>
                        <div className={styles.likeSave}>
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
                            
                            <div>
                                <p>Save</p>
                            </div>
                        </div>
                        <div>
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
            </div>
        )}
    </div>
  )
}
