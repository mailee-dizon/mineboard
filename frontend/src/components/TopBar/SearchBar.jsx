import React, {use, useState} from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";
import { API_URL } from '../../../constants/api';

export const SearchBar = ({setResults}) => {

    const [input, setInput] = useState("")
   
    /* we want to be able to search:
        1. users (usernames) -> display users
        2. categories 
        3. by title (should not be exact. if u search "cottagecore" any titles with cottagecore or cottage within it should pop up)
    */

    /* Placeholder for fetching data for search results. Once we figure out backend and connect, this will change */
    const fetchData = async (value) => {
        const title_results = await fetch(`${API_URL}/posts/title/${value}`); // getPostsByTitle
        const title_data = await title_results.json();

        const category_results = await fetch(`${API_URL}/posts/category`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    categories: [value]
                })

            }); // getPostsByCategory
        const category_data = await category_results.json();

        const results = [...title_data, ...category_data];
        console.log("results", results)

        setResults(results);
        };

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return(
        <div className={styles["input-wrapper"]}>
            <Search className={styles.searchIcon}/>
            <input 
                placeholder="Search" 
                value={input} 
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>       
    )

}