'use client';
import React, { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import styles from "./UploadImages.module.css";

import { UploadDropzone } from '@uploadthing/react';
import "@uploadthing/react/styles.css";

/*
    Need to style more; when we add pic i want it to be displayed/replace uploadImagesBox
    should have button like + to add more pics, display these like insta where you have arrows < > to go back and forth 
    to see all pics u uploaded
*/

export const UploadImages = ({images, setImages}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // showPrev() and showNext() allow users to look thru the imgs they're uploading
    const showPrev = () => {
        setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1)); 
    };
    const showNext = () => {
        setCurrentIndex(prev => (prev === images.length-1 ? 0 : prev+1));
    };
    const removeCurrent = () => {

    }

  return (
    <div className={styles.uploadImages}>
        {images.length === 0 ?(
            <div className={styles.uploadImagesBox}>
                <UploadDropzone // from uploadthing
                    endpoint="imageUploader"
                    multiple
                    onClientUploadComplete={(res) =>{
                        const newImages = res.map(file => ({ 
                            url: file.ufsUrl,
                            preview: file.ufsUrl
                        }));
                        setImages(newImages);
                        setCurrentIndex(0);
                    }}
                    appearance={{
                        container: {border: 'none'},
                        button: { width: '100%', height: '100%', background: 'black', color: 'white', font: 'inherit'},
                    }}
                /> 
            </div>
        ) : ( // more than one img uploaded
            <>
            <div className={`${styles.uploadImagesBox} ${styles.deleteUploads}`}>
                <div className={styles.multipleUploads}>
                    {images.length > 1 && (
                        <ArrowLeft 
                            onClick={showPrev}    
                        />
                    )}
                    <img
                        src={images[currentIndex].preview}
                        alt="preview"
                        className={styles.previewImage}
                    />        
                    {images.length > 1 && (
                        <ArrowRight 
                            onClick={showNext}    
                        />
                    )}
                </div>
                <button onClick={removeCurrent} className={styles.deleteButton}>Delete Image</button>   
            </div>
            <div className={styles.uploadImagesBox}>
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        const newImages = res.map(file => ({
                            url: file.ufsUrl,
                            preview: file.ufsUrl
                        }));
                        setImages(prev => [...prev, ...newImages]);
                    }}
                    appearance={{
                        button: { width: '100%', height: '100%', background: 'black', color: 'white', font: 'inherit'},
                        allowedContent: { display: 'none' }
                    }}
                />
            </div>
            </>
            )
        }
    </div>
    )
}