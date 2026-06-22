'use client';
import React, { useEffect, useState } from 'react'
import styles from "./Post.module.css";
import { useUser } from '@clerk/nextjs';
import { ArrowLeft, ArrowRight, Bookmark, Heart } from 'lucide-react'
import { likePost } from './LikePost'; 
import { useRouter } from 'next/navigation';
import { Category } from './Category';
import { API_URL } from '../../../constants/api';

export const Post = ({ post, userData }) => {
    const { isLoaded, user } = useUser();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ isLiked, setIsLiked ] = useState(false);
    const [ numLikes, setNumLikes ] = useState();
    const router = useRouter();
    
    useEffect(() => {
        if (!isLoaded) return;
        const fetchLikeStatus = async () => {
            try {
                const res = await fetch(`${API_URL}/likes/${user.id}/${post.postid}`); // get if user in likes table
                const data = await res.json()
                setIsLiked(data.length > 0); // means it exists, user has liked it

                const postRes = await fetch(`${API_URL}/posts/title/${post.title}`) // get post by title
                const postData = await postRes.json() // 
                const thisPost = postData.find(p => p.postid === post.postid); // titles can be duplicated, must find specific post

                setNumLikes(thisPost.likes ?? 0);
            } catch (e){
                console.error("Failed to fetch like status: ", e);
            }
        };
        fetchLikeStatus();
    }, [isLoaded, user?.id, post?.postid]);

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
                    <div 
                        className={styles.userInfo}
                        onClick={() => router.push(`/profileview/${userData.userid}`)}
                    >
                        <img
                            src={userData.pfp}
                            alt="user pfp"
                            className={styles.pfpIcon}
                        />
                        <p>{userData.username}</p>
                    </div>
                    <div className={styles.textBox}>
                        <h1>{post.title}</h1>
                        <p>{post.descript}</p>
                        
                        {post.categories != null && post.categories.length > 2 && (
                        <div className={styles.postCategories}>
                            {(post.categories.replace(/[{}]/g, '').split(',')).map(category => ( // post.categories is a literal string with {category,category....}
                                <Category key={category} category={category}/>
                            ))}
                        </div>
                        )}
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
                            <p>{numLikes || 0}</p>
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
