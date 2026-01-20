"use client"
import react, { useState } from "react";
import styles from "./ProfileContent.module.css"
import { Bookmark, Grid3X3 } from "lucide-react";
import { PostFeed } from "../Post/PostFeed";
import BoardFeed from "../Board/BoardFeed";

export default function ProfileContent({ initialPosts }) {
    const [ post, setPost ] = useState(true)

    return (
        <div>
            <div className={styles.topBar}>
                <button className={styles.topBarButton} onClick={() => setPost(true)}>
                    <Grid3X3 className={post && (`${styles.topButtonUnderline}`)} fill={post ? "black": "white"} color={post ? "white" : "gray"} size="30px"/>
                </button>
                <button className={styles.topBarButton} onClick={() => setPost(false)}>
                    <Bookmark className={!post && (`${styles.topButtonUnderline}`)}  fill={!post ? "black": "white"}  color={post ? "gray" : "white"} size="30px"/>
                </button>
            </div>
            {post ? (
                <PostFeed initialPosts={initialPosts}/>
            ) : (
                <BoardFeed/>
            )}
            
            
        </div>
    )
}