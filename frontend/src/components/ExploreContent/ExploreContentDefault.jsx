import Category from "./Category";
import styles from "./ExploreContent.module.css";

export default function ExploreContentDefault({ categoryData }) {
  return (
    <div>
      <h1 className={styles.title}>Browse Categories</h1>
      <div className={styles.categories}>
        {categoryData.map(({ category, image }) => (
          <Category key={category} category={category} image={image} />
        ))}
      </div>
    </div>
  );
}
