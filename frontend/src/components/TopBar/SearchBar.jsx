import React, {useEffect} from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";
import { API_URL } from '../../../constants/api';
import { useRouter } from "next/navigation";
import { searchPosts } from "./SearchApi";

export const SearchBar = ({setResults, searchInput, setSearchInput, setIsLoading, setProfileResults}) => {
    const router = useRouter();
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
    
            const profile_results = await fetch(`${API_URL}/users/${value}`, {signal}); // get users by username (value = search)
            const profile_data = profile_results.ok ? await profile_results.json() : [];
            setProfileResults(profile_data);

            const results = await searchPosts(value, signal);
            console.log('results: ', results)
            setResults(results);

        } catch (e){
            if(e.name != "AbortError"){
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
    const handleKeyDown = (event) =>{
        if (event.key === 'Enter'){
            router.push(`/explore/${searchInput}`) // route to the query, fetch again in explore
            setSearchInput("");
        }
    }

    return(
        <div className={styles["input-wrapper"]}>
            <Search className={styles.searchIcon}/>
            <input 
                placeholder="Search" 
                value={searchInput} 
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
        </div>       
    )

}