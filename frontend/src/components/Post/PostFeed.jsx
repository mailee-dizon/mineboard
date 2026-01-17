'use client'
import { PostPreview } from "./PostPreview";
import styles from "./PostFeed.module.css"
import Masonry from "react-masonry-css";
import useWindowWidth from "./useWindowWidth.jsx";

export const PostFeed = ({ initialPosts }) => {
  const width = useWindowWidth();

  const columns = Math.max(1, Math.floor(width / 250)); // 250px per column

  return (

      <Masonry 
        breakpointCols={columns}
        className={styles.postGrid}
        columnClassName={styles.postGridColumn}
      >
          {initialPosts.map(post => (
            <PostPreview key={post.postid} post={post}/>
          ))}
      </Masonry>

  );
};
