'use client';
import React, { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import styles from "./SelectFiles.module.css";

// uploadthing to be replaced with firebase storage
import { UploadDropzone } from '@uploadthing/react';
import "@uploadthing/react/styles.css";

/*
    Need to style more; when we add pic i want it to be displayed/replace uploadImagesBox
    should have button like + to add more pics, display these like insta where you have arrows < > to go back and forth 
    to see all pics u uploaded

    uploadImage button uploads selected files -> previews (should preview before??? after??)
    if no files chosen (images.length == 0) -> need an error/alert saying "please select at least one file"
    */


export const SelectFiles = ({images=[], setImages}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // showPrev() and showNext() allow users to look thru the imgs they're uploading
    const showPrev = () => {
        setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };
    const showNext = () => {
        setCurrentIndex(prev => (prev === images.length-1 ? 0 : prev+1));
    };
    const removeCurrent = () => {
        // dont want a selected image, remove from preview/uploads. 
    }

    const handleFiles = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => ({
            file: file,
            url: URL.createObjectURL(file)
        }))
        setImages(prev => [...prev, ...newImages]); // all selected files
    }

  return (
    <div className={styles.selectFiles}>
        {images.length === 0 ?( // will restyle below once functioning 
            <div className={styles.selectFilesBox}>
                <input 
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFiles}
                />
            </div>
        ) : ( // more than one img uploaded
            <>
            <div className={`${styles.selectFilesBox} ${styles.deleteSelection}`}>
                <div className={styles.multipleSelections}>
                    {images.length > 1 && (
                        <ArrowLeft 
                            onClick={showPrev}    
                        />
                    )}
                    <img
                        src={images[currentIndex].url} // redo;; this uses uploadthing
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
            <div className={styles.selectFilesBox}>
                <input 
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFiles}
                />
            </div>
            </>
            )
        }
    </div>
    )
}