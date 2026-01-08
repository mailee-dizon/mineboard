'use client';
import React, { useState } from 'react'
import { Upload, ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import styles from "./UploadImages.module.css";
import { UploadButton } from '@uploadthing/react';

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

  return (
        <div className={styles.upLoadImages}>
        {images.length === 0 ?(
            <div className={styles.uploadImagesBox}>
                <UploadButton // from uploadthing
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) =>{
                        const newImages = res.map(file => ({ 
                            url: file.ufsUrl,
                            preview: file.ufsUrl
                        }));
                        setImages(newImages);
                        setCurrentIndex(0);
                    }}
                    appearance={{
                        button: { width: '100%', height: '100%', background: 'transparent', color: 'inherit' },
                        allowedContent: { display: 'none' }                   
                    }}
                    content={{
                        button: (
                                <div className={styles.uploadImagesInner}>
                                    <Upload className={styles.uploadIcon} />
                                    <p className={styles.uploadImagesText}>Choose a file or drag and drop here</p>
                                </div>
                            )
                    }}
                /> 
            </div>
        ) : ( // more than one img uploaded
            <div className={styles.uploadImagesBox}>
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
                <div className={styles.addMoreSmall}>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            const newImages = res.map(file => ({
                                url: file.ufsUrl,
                                preview: file.ufsUrl
                            }));
                            setImages(prev => [...prev, ...newImages]);
                        }}
                        content={{ button: <Plus size={16} /> }}
                        appearance={{
                            button: { borderRadius: '50%', width: '30px', height: '30px' },
                            allowedContent: { display: 'none' }
                        }}
                    />
                </div>
            </div>
            )
        }
        </div>
    )
}