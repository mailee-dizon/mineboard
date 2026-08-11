'use client'

import styles from './ExploreContent.module.css'
import { API_URL } from '../../../constants/api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Category({ category }) {
    const capitalized =
        category.charAt(0).toUpperCase() + category.slice(1)

    const [image, setImage] = useState(null)
    const router = useRouter()

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(
                    `${API_URL}/posts/category/${category}`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch posts')
                }

                const data = await response.json()
                const randomIndex = Math.floor(Math.random() * data.length);


                if (data.length > 0 && data[0].images[0]) {
                    setImage(data[randomIndex].images[randomIndex])
                }
            } catch (error) {
                console.error('Error getting image:', error)
            }
        }

        fetchPost()
    }, [])


    return (
        <Link 
            className={styles.border}
            href={`/explore/${category}?category=${category}`}
        >
            {image && (
                <img
                    src={image}
                    className={styles.backgroundImage}
                    alt={capitalized}
                />
            )}

            <p className={styles.category}>{capitalized}</p>
        </Link>
    )
}