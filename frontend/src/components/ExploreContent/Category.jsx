
import styles from './ExploreContent.module.css'
import { API_URL } from '../../../constants/api';

export default async function Category({category}) {
    const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
    const response = await fetch(`${API_URL}/posts/category/${category}`);
    const data = await response.json()
    console.log(data)

    return (
        <div className={styles.border}>
            <p className={styles.category}>{capitalized}</p>
        </div>
    )
}