import React, {useEffect} from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";
import { API_URL } from '../../../constants/api';

export const SearchBar = ({setResults, searchInput, setSearchInput, setIsLoading}) => {

    useEffect(() => {
        if (!searchInput || searchInput.trim() === ""){
            setResults([]);
            setIsLoading(false)
            return;
        }

    setIsLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async (value) => {
        try {        
            const title_results = await fetch(`${API_URL}/posts/title/${value}`, {signal}); // getPostsByTitle
            const title_data = title_results.ok ? await title_results.json() : [];
            let category_data = [];

            if (value.length > 3){
                const category_results = await fetch(`${API_URL}/posts/category`, 
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            categories: [value]
                        }), 
                        signal

                    }); // getPostsByCategory
                if (category_results.ok) {
                    category_data = await category_results.json();
                }
                else{
                    console.log("Failed to get categories", category_results.status)
                    category_data = [];
                }
            }



            let results = [];
            if(Array.isArray(category_data)){
                results = [...new Set([...title_data, ...category_data])];
            }
            else{
                results = title_data
            }
            setResults(results);
        } catch (e){
            if(e != "AbortError"){
                console.log("No results found", e)
            }
        }   finally{
            if (!signal.aborted){
                setIsLoading(false);
            }
        }
    };
    const timeoutId = setTimeout(() => fetchData(searchInput), 300);   
    return () => {
        clearTimeout(timeoutId);
        controller.abort();
    };

    }, [searchInput]);


    const handleChange = (value) => {
        setSearchInput(value)
    }
    const handleBlur = () => {
        setTimeout(() => {
            setSearchInput("");
            setResults([]);
        }, 300);
    }

    return(
        <div className={styles["input-wrapper"]}>
            <Search className={styles.searchIcon}/>
            <input 
                placeholder="Search" 
                value={searchInput} 
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
            />
        </div>       
    )

}