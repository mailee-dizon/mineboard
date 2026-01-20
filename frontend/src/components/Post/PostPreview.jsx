import React from 'react';
import styles from './PostPreview.module.css';
import Link from 'next/link';

export const PostPreview = ({ post}) => {
  return (
    <Link href={`/postview/${post.userid}/${post.postid}`}>
        <div className={styles.postPreview} >
        <img
            src={post.images[0]} // show first image of the post
            alt="post preview"
            className={styles.previewImage}
        />
        </div>
    </Link>
  );
}; 
