import React from 'react'
import { storage } from '@/utils/firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const uploadImages = async (userId, file) => {
    // this sends it fully to the database; should be done when POST is hit 
    if (!file) throw Error("No file provided");
        
    // Create name for files
    const fileName = `${Date.now()}-${file.name}`;
    const imageRef = ref(storage, `pfp/${userId}/${fileName}`)
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
};
