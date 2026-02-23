// src/app/components/TopBar.jsx
"use client"; // important for interactive components in Next.js

import React, { useState, useEffect } from "react";
import styles from "./TopBar.module.css";
import {SearchBar} from "../TopBar/SearchBar"
import {SearchResults} from "../TopBar/SearchResults"
import { LoginButton } from "../TopBar/LoginButton";
import { useUI } from "@/context/UIContext";
import { API_URL } from "../../../constants/api";

export default function TopBar({ userId }) {
    const [profile, setProfile] = useState()

    const [results, setResults] = useState([]);
    const [profileResults, setProfileResults] = useState([]);
    const [ searchInput, setSearchInput ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const { isCollapsed } = useUI();

    useEffect(() => {
        if (!userId) {
        setProfile(null);
        return;
        }

        fetch(`${API_URL}/users/id/${userId}`)
        .then(res => res.json())
        .then(data => setProfile(data[0]))
    }, [userId]);
        
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
                <SearchBar setResults={setResults} searchInput={searchInput} setSearchInput={setSearchInput} setIsLoading={setIsLoading} setProfileResults={setProfileResults} results={results}/>
                <SearchResults results={results} searchInput={searchInput} setSearchInput={setSearchInput} isLoading={isLoading} profileResults={profileResults}/>
            </div>
            <div className={`${styles.topBarItem} ${styles.loginButton}`}>
                <LoginButton initialData={profile} userId={userId}/>
            </div>


        </div>

    </div>
  );
}
