
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import react from "react";
import { API_URL } from "../../../../../constants/api.js";

export default async function ProfilePage({ params }) {
    const { id } = await params;
    const response = await fetch(`${API_URL}/users/id/${id}`);
    const data = await response.json();

    
    return (
        <div>
            <ProfileHeader profileUser={id} initialData={data[0]}/>
        </div>
    )
}