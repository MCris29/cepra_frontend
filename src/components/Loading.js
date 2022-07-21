import styles from "@/styles/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span>Guardando</span>
    </div>
  );
}
