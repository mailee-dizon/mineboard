import React from "react";
import styles from "./SearchResults.module.css";
import { useRouter } from "next/navigation";

export const SearchResults = ({ results }) => {
    const router = useRouter()
    
    return <div className={styles["results-list"]}>
    {
        Object.values(results).map((result) => (
            <div className={styles.resultContainer}>
                <button 
                    className={styles.resultOption} 
                    key={result.postid} 
                    onClick={()=> {router.push(`/postview/${result.userid}/${result.postid}`)}}
                >
                    {result.title}
                </button>

            </div>
        
        ))
    }

    </div>

}