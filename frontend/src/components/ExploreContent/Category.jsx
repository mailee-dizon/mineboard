import styles from './ExploreContent.module.css';
import Link from 'next/link';

export default function Category({ category, image }) {
  const capitalized = category.charAt(0).toUpperCase() + category.slice(1);

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
  );
}
