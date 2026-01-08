// UserSync.jsx
'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

// syncing current user data from DB 

export const UserSync = () => {
    const { isLoaded, isSignedIn, user } = useUser();

    useEffect(() => {
        const handleSync = async () => {
            if (isLoaded && isSignedIn && user) {
                try {
                    const payload = {
                        userId: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        pfp: user.imageUrl
                    };

                    await fetch(`https://mineboard.onrender.com/api/users`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });                    
                } catch (err) {
                    console.error("Sync error:", err);
                }
            }
        };

        handleSync();
    }, [isLoaded, isSignedIn, user]);

    return null; 
};