import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
<<<<<<< HEAD
import { API_URL } from "../../../../../constants/api.js";
import ProfileContent from "@/components/ProfileContent/ProfileContent.jsx";
=======
import React from "react";
import { API_URL } from "../../../../../constants/api.js";
import { PostFeed } from "@/components/Post/PostFeed.jsx";
>>>>>>> 97065bd2f9848ba18a0c91e68be15d673d8dc59b

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
<<<<<<< HEAD
            <ProfileContent/>
=======
            <PostFeed initialPosts={userPosts}/>
>>>>>>> 97065bd2f9848ba18a0c91e68be15d673d8dc59b
        </div>
    )
}