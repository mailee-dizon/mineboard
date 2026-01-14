'use client';
import React, { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import styles from "./SelectFiles.module.css";

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
        if (images.length === 0){
            return;
        }
        const newImages = [...images]; // copy to avoid mutating prop
        newImages.splice(currentIndex, 1); // remove only current image
        setImages(newImages);

        setCurrentIndex(prev => {
            if (prev === 0) return 0; // if first image removed
            if (prev >= newImages.length) return newImages.length - 1; // last image removed
            return prev;
        });
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
                        src={images[currentIndex].url} 
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