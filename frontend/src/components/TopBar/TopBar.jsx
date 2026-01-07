// src/app/components/TopBar.jsx
"use client"; // important for interactive components in Next.js

import React, {useState} from "react";
import Link from "next/link";
import styles from "./TopBar.module.css";
import {SearchBar} from "../TopBar/SearchBar"
import {SearchResults} from "../TopBar/SearchResults"
import { LoginButton } from "../TopBar/LoginButton";

export default function TopBar({isCollapsed}) {
    const [results, setResults] = useState([]);
    
    return (

    <div className={styles.topBar}>
        <div
            className={styles.topBarInner}
            style={{
                marginLeft: isCollapsed ? "60px" : "200px",
                transition: "margin-left 0.3s",
                paddingLeft: isCollapsed ? 30 : 40,

            }}
        >
            <div className={`${styles.topBarItem} ${styles.searchBar}`}>
                <SearchBar setResults={setResults}/>
                <SearchResults results={results}/>
            </div>
            <div className={`${styles.topBarItem} ${styles.loginButton}`}>
                <LoginButton/>
            </div>


        </div>

    </div>
  );
}
