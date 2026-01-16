import { PostPreview } from "./PostPreview";

export const PostFeed = ({ initialPosts }) => {

  return (
    <div className="postGrid">
        {initialPosts.map(post => (
        <PostPreview key={post.postid} post={post}/>
        ))}
    </div>
  );
};
