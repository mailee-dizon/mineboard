// src/app/pages/PostViewPage.jsx
import React from "react";
import { Post } from "@/components/Post/Post";
import { API_URL } from "../../../../../../constants/api";

export default async function PostViewPage({ params }) {
  const { userId, postId } = await params;
  const postRes = await fetch(`${API_URL}/posts/${userId}`) // get post by user; TO DO: CHANGE BASED ON CATEGORIES/TITLE
  const allPosts = await postRes.json();
  const post = allPosts.find(p => p.postid == postId);
  
  const userRes = await fetch(`${API_URL}/users/id/${userId}`);
  const userData = (await userRes.json());

  console.log("post:", post);
  console.log("userData:", userData);

  return (
    <div>
      <h1>Post View Page</h1>
      <Post post={post} userData={userData[0]} />
    </div>
  );
}
