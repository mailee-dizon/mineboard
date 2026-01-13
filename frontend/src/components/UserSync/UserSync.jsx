// UserSync.jsx
'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

// syncing current user data from DB 

export const UserSync = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const syncStarted = useRef(false);
    useEffect(() => {
        const handleSync = async () => {
            if (isLoaded && isSignedIn && user && !syncStarted.current) {
                syncStarted.current = true;
                try {
                
                const checkRes = await fetch(`https://mineboard.onrender.com/api/users/${user.id}`);

                
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