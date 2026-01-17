import { PostPreview } from "./PostPreview";
import styles from "./PostFeed.module.css"

export const PostFeed = ({ initialPosts }) => {

  return (
    <div className={styles.postGrid}>
        {initialPosts.map(post => (
          <PostPreview key={post.postid} post={post}/>
        ))}
    </div>
  );
};
