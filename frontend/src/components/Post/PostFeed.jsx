'use client'
import { useEffect, useRef } from "react";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import { PostPreview } from "./PostPreview";
import styles from "./PostFeed.module.css"

export const PostFeed = ({ initialPosts }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    let msnry;

    // dynamically import Masonry only in the browser
    import("masonry-layout").then((Masonry) => {
      msnry = new Masonry.default(gridRef.current, {
        itemSelector: `.${styles.postItem}`,
        columnWidth: `.${styles.postItem}`,
        gutter: 16,
        percentPosition: true,
      });

      imagesLoaded(gridRef.current, () => {
        msnry.layout();
      });
    });

    return () => {
      if (msnry) msnry.destroy();
    };
  }, []);

  return (
    <div ref={gridRef} className={styles.postGrid}>
        {initialPosts.map(post => (
          <div key={post.postid} className={styles.postItem}>
            <PostPreview post={post}/>
          </div>
        ))}
    </div>
  );
};
