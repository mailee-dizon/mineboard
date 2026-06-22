'use client';
import React from "react";
import styles from "./SearchResults.module.css";
import { useRouter } from "next/navigation";

export const SearchResults = ({ results, searchInput, setSearchInput, isLoading, profileResults }) => {
    const router = useRouter()
    if (!searchInput || searchInput.trim().length === 0) {
        return null;
    }

    return (
        <div className={styles["results-list"]}>
        {isLoading ? (
            <p className={styles.resultOption}>Loading...</p>
        ) :

        results.length != 0 ? (
            results.map((result) => (
                <div 
                    key={result.postid} 
                    className={styles.resultContainer}
                >
                    <button 
                        className={styles.resultOption}
                        onMouseDown={() => {
                            router.push(`/explore/${encodeURIComponent(searchInput)}?selected=${result.postid}`); // routes to the specific post; MUST CHANGE!
                            setSearchInput("");
                        }}
                    >
                        {result.title}
                    </button>
                </div>
            ))
        ) :  profileResults.length > 0 ? (
            profileResults.map((profileResult) => (
                <div 
                    key={profileResult.userid}
                    className={styles.resultContainer}
                >
                    <button 
                        className={styles.resultOption}
                        onMouseDown={() => {
                            router.push(`/profileview/${profileResult.userid}`)
                            setSearchInput("");
                        }}
                    >
                        <img
                            src={profileResult.pfp}
                            alt="user pfp"
                            className={styles.profileResultPfp}
                        />
                        {profileResult.username}
                    </button>
                </div>
            ))
        ) : (
            <div className={styles.resultContainer}>
                <p className={styles.resultOption}>
                    No results found.
                </p>
            </div>
        ) 
        
    }
        

        </div>
)}