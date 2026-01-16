"use client"
import react, { useState } from "react";
import styles from "./ProfileContent.module.css"
import { Bookmark, Grid3X3 } from "lucide-react";

export default function ProfileContent() {
    const [ post, setPost ] = useState(true)

    return (
        <div>
            <div className={styles.topBar}>
                <button className={styles.topBarButton} onClick={() => setPost(!post)}>
                    <Grid3X3 className={post && (`${styles.topButtonUnderline}`)} fill={post ? "black": "white"} color={post ? "white" : "gray"} size="30px"/>
                </button>
                <button className={styles.topBarButton} onClick={() => setPost(!post)}>
                    <Bookmark className={!post && (`${styles.topButtonUnderline}`)}  fill={!post ? "black": "white"}  color={post ? "gray" : "white"} size="30px"/>
                </button>
            </div>

            
        </div>
    )
}