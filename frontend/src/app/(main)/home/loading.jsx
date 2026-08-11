import MCLoadingSpinner from "@/components/MCLoadingSpinner";
import styles from "@/app/page.module.css";

export default function Loading() {
  return (
    <div className={styles.centerLoading}>
      <MCLoadingSpinner text="" size={120} speed={2} />
    </div>
  );
}
