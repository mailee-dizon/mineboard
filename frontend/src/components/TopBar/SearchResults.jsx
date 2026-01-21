import React from "react";
import styles from "./SearchResults.module.css";
import { useRouter } from "next/navigation";


export const SearchResults = ({ results }) => {
    const router = useRouter()

    return <div className={styles["results-list"]}>
    {
        results.map((result, id) =>{
            return (
            <div>
                <button className={styles.result} key={id} onClick={()=> {router.push(`/home`)}}>
                    {result.name}
                </button>

            </div>
            )
        })
    }

    </div>

}