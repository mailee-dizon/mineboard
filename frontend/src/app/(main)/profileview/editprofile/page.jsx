import EditProfile from '@/components/EditProfile/EditProfile';
import React from 'react'
import { currentUser } from '@clerk/nextjs/server';
import { API_URL } from '../../../../../constants/api';
import { redirect } from 'next/navigation';

export default async function EditProfilePage() {
    const user = await currentUser()
    const response = await fetch(`${API_URL}/users/id/${user.id}`)
    const data = await response.json()

    if (!user) {
        redirect("./sign-in")
    }

    return (
        <div>
            <EditProfile initialData={data[0]}/>
        </div>
    );
}
