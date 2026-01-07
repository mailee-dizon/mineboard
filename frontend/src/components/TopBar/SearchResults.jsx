import React from "react";
import styles from "./SearchResults.module.css";

export const SearchResults = ({ results }) => {
    return <div className={styles["results-list"]}>
    {
        results.map((result, id) =>{
            return <div className={styles.result} key={id}>{result.name}</div>
        })
    }

    </div>

}