import React from 'react'
import { storage } from '@/utils/firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 as uuidv4 } from 'uuid';

export const uploadImages = async (images) => {
    // this sends it fully to the database; should be done when POST is hit 
    const batchId = uuidv4();
    const uploadPromises = images.map(async (item) => {
        
        // Create name for files
        const fileName = `${Date.now()}-${item.file.name}`;
        const imageRef = ref(storage, `post/${batchId}/${fileName}`)
        const snapshot = await uploadBytes(imageRef, item.file);
        const downloadURL = await getDownloadURL(snapshot.ref);
    });
    return await Promise.all(uploadPromises);
};
