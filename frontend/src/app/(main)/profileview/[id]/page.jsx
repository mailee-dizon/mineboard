import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import React from "react";
import { API_URL } from "../../../../../constants/api.js";
import { PostFeed } from "@/components/Post/PostFeed.jsx";

export default async function ProfilePage({ params }) {
    const { id } = await params;
    const response = await fetch(`${API_URL}/users/id/${id}`);
    const data = await response.json();
    
    // on profilePage should call getAllUserPosts -> PostFeed
    const postRes = await fetch(`${API_URL}/posts/${id}`);
    const userPosts = await postRes.json();

    return (
        <div>
            <ProfileHeader profileUser={id} initialData={data[0]}/>
            <PostFeed initialPosts={userPosts}/>
        </div>
    )
}