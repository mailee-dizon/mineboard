'use client'
import { PostPreview } from "./PostPreview";
import styles from "./PostFeed.module.css"
import Masonry from "react-masonry-css";
import useWindowWidth from "./useWindowWidth.jsx";

export const PostFeed = ({ initialPosts }) => {
  const [ref, width] = useWindowWidth();

  const columns = Math.max(1, Math.min(Math.floor(width / 220), initialPosts.length));


  return (  
    <div ref={ref} className={styles.gridWrapper}>
      <Masonry 
        breakpointCols={columns}
        className={styles.postGrid}
        columnClassName={styles.postGridColumn}
      >
          {initialPosts.map(post => (
            <PostPreview key={post.postid} post={post}/>
          ))}
      </Masonry>
    </div>
  );
};
