'use client'
import { useState } from "react";
import Category from "./Category";
import styles from "./ExploreContent.module.css"

export default function ExploreContentDefault() {
    const categories = [
        'interior',
        'exterior',
        'house',
        'town',
        'castle',
        'redstone'
    ]

  return (
    <div>
        <h1 className={styles.title}>Browse Categories</h1>
        <div className={styles.categories}>
            {categories.map((category) => (
                <Category key={category} category={category}/>
            ))}
        </div>
    </div>
  )
}