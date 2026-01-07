import React, {use, useState} from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

export const SearchBar = ({setResults}) => {

    const [input, setInput] = useState("")
   
    /* Placeholder for fetching data for search results. Once we figure out backend and connect, this will change */
    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
            const results = json.filter((user) => {
                return value && user && user.name && user.name.toLowerCase().includes(value);
            });
            setResults(results);
        });
    }
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