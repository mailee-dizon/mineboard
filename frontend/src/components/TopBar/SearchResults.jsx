import React from "react";
import styles from "./SearchResults.module.css";
import { useRouter } from "next/navigation";

export const SearchResults = ({ results, searchInput, setSearchInput, isLoading }) => {
    const router = useRouter()
    if (!searchInput || searchInput.trim().length === 0) {
        return null;
    }
    return (
        <div className={styles["results-list"]}>
        {isLoading ? (<p className={styles.resultOption}>Loading...</p>) :

        results.length != 0 ? (
            results.map((result) => (
                <div 
                    key={result.postid} 
                    className={styles.resultContainer}
                >
                    <button 
                        className={styles.resultOption}
                        onMouseDown={() => {
                            router.push(`/postview/${result.userid}/${result.postid}`); // routes to the specific post; MUST CHANGE!
                            setSearchInput("");
                        }}
                    >
                        {result.title}
                    </button>
                </div>
            ))
        ) : (
            <div className={styles.resultContainer}>
                <p className={styles.resultOption}>
                    No results found.
                </p>
            </div>
        )}

        </div>
)}