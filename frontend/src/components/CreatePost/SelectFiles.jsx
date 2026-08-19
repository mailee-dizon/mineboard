'use client';
import React, { useState, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import styles from "./SelectFiles.module.css";

export const SelectFiles = ({images=[], setImages}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dragIndex = useRef(null);

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
        setImages(prev => [...newImages, ...prev]); // newest uploads show first
        setCurrentIndex(0); // jump to the newest image
    }

    // ----- drag-to-reorder for the thumbnail strip -----
    const handleDragStart = (index) => {
        dragIndex.current = index;
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // required to allow dropping
    };

    const handleDrop = (dropIndex) => {
        const fromIndex = dragIndex.current;
        if (fromIndex === null || fromIndex === dropIndex) return;

        const reordered = [...images];
        const [moved] = reordered.splice(fromIndex, 1);
        reordered.splice(dropIndex, 0, moved);
        setImages(reordered);

        setCurrentIndex(dropIndex); // follow the image that was just moved
        dragIndex.current = null;
    };

  return (
    <div className={styles.selectFiles}>
        {images.length === 0 ?(
            <label className={styles.selectFilesBox}>
                <div className={styles.uploadPrompt}>
                    <div className={styles.blockIcon}>
                        <img
                            className={styles.blockImage}
                            src="minecraftLogo.webp"
                        />
                    </div>
                    <p className={styles.uploadTitle}>Drag builds here</p>
                    <p className={styles.uploadSubtitle}>or click to browse your world</p>
                </div>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFiles}
                    className={styles.hiddenInput}
                />
            </label>
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

            {images.length > 1 && (
                <div className={styles.thumbnailStrip}>
                    {images.map((img, index) => (
                        <img
                            key={img.url}
                            src={img.url}
                            alt={`thumbnail-${index}`}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(index)}
                            onClick={() => setCurrentIndex(index)}
                            className={`${styles.thumbnail} ${
                                index === currentIndex ? styles.thumbnailActive : ''
                            }`}
                        />
                    ))}
                </div>
            )}

            <label className={styles.addMoreBox}>
                <span>+ Add more images</span>
                <input 
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFiles}
                    className={styles.hiddenInput}
                />
            </label>
            </>
            )
        }
    </div>
    )
}
