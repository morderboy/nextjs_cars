'use client'
import styles from "./layout.module.css"

export default function LoginLayout({ children }) {
  const handleClick = () => {
    window.location.href = `${window.location.origin}/`;
  }

    return (
      <main className={styles.main}>
            <button className={styles.backButton} onClick={handleClick}>
                ← На главную
            </button>
            {children}
        </main>
    );
  }