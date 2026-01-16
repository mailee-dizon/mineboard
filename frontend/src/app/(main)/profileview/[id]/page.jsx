
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import { API_URL } from "../../../../../constants/api.js";
import ProfileContent from "@/components/ProfileContent/ProfileContent.jsx";

export default async function ProfilePage({ params }) {
    const { id } = await params;
    const response = await fetch(`${API_URL}/users/id/${id}`);
    const data = await response.json();

    
    return (
        <div>
            <ProfileHeader profileUser={id} initialData={data[0]}/>
            <ProfileContent/>
        </div>
    )
}