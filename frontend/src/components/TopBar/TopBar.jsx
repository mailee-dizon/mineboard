// src/app/components/TopBar.jsx
"use client"; // important for interactive components in Next.js

import React, {useState} from "react";
import styles from "./TopBar.module.css";
import {SearchBar} from "../TopBar/SearchBar"
import {SearchResults} from "../TopBar/SearchResults"
import { LoginButton } from "../TopBar/LoginButton";
import { useUI } from "@/context/UIContext";

export default function TopBar({ initialData, isLogged }) {
    const [results, setResults] = useState([]);
    const [ searchInput, setSearchInput ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const { isCollapsed } = useUI();
    
    return (

    <div className={styles.topBar}>
        <div
            className={styles.topBarInner}
            style={{
                marginLeft: isCollapsed ? "60px" : "200px",
                paddingLeft: isCollapsed ? 30 : 40,
                transition: "margin-left 0.3s",
            }}
        >
            <div className={`${styles.topBarItem} ${styles.searchBar}`}>
                <SearchBar setResults={setResults} searchInput={searchInput} setSearchInput={setSearchInput} setIsLoading={setIsLoading}/>
                <SearchResults results={results} searchInput={searchInput} setSearchInput={setSearchInput} isLoading={isLoading}/>
            </div>
            <div className={`${styles.topBarItem} ${styles.loginButton}`}>
                <LoginButton initialData={initialData} isLogged={isLogged}/>
            </div>


        </div>

    </div>
  );
}
