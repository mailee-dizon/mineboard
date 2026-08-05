// src/app/pages/HomePage.jsx
import { PostFeed } from "@/components/Post/PostFeed";
import React from "react";
import { API_URL } from "../../../../constants/api";

export default async function HomePage() {

  const response = await fetch(`${API_URL}/posts`)

  if (!response.ok) {
    throw new Error("Failed to fetch post")
  }

  const posts = await response.json();

  return (
      <div>
        <PostFeed initialPosts={posts}/>
      </div>
  );
}
