// UserSync.jsx
'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

// syncing current user data from DB 

export const UserSync = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const syncStarted = useRef(false);
    useEffect(() => {
        if (!isLoaded || !isSignedIn || !user || syncStarted.current) return;
        syncStarted.current = true;

        const handleSync = async () => {
            try {
                
                const checkRes = await fetch(`https://mineboard.onrender.com/api/users/${user.id}`);

                if (!checkRes.ok) {
                    console.error("Failed to check backend user: ", checkRes.statusText);
                    return;
                }

                const existingUser = await checkRes.json();
                if (existingUser){
                    console.log("User exists in backend", existingUser);
                    return;
                }

                const payload = {
                    userId: user.id,
                    username: user.username, 
                    firstName: user.firstName ?? "",
                    lastName: user.lastName ?? "",
                    pfp: user.imageUrl
                };

                const createRes = await fetch(`https://mineboard.onrender.com/api/users`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });    
                    
                if (!createRes.ok){
                    const createResErr = await createRes.text();
                    console.error("Create user failed: ", createResErr);
                    return;
                }

                const newUser = await createRes.json();
                console.log("New user created and signed in", newUser)
                    
                } catch (err) {
                    console.error("Sync error:", err);
                }
            }
        

        handleSync();
    }, [isLoaded, isSignedIn, user]);

    return null; 
};