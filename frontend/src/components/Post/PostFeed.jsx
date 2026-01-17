'use client'
import { useEffect, useRef } from "react";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import { PostPreview } from "./PostPreview";
import styles from "./PostFeed.module.css"

export const PostFeed = ({ initialPosts }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    let Masonry;

    const initMasonry = async () => {
      if (!gridRef.current) return;

      Masonry = (await import("masonry-layout")).default;

      masonryRef.current = new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true,
        gutter: 10,
      });

      imagesLoaded(gridRef.current, () => {
        masonryRef.current.layout();
      });
    };

    initMasonry();

    return () => {
      masonryRef.current?.destroy();
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
