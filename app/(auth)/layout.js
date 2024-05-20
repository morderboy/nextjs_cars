'use client'
import styles from "./layout.module.css"

export default function LoginLayout({ children }) {
  const handleClick = () => {
    window.location.href = 'http://5.35.85.98/';
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