import Link from 'next/link';
import styles from '../styles/404.module.css'; // Assume you have a CSS module for styling your 404 page.

export default function Custom404() {
    return (
        <div className={styles.container}>
            <div className={styles.tier_title}>
                <h2 className='text-5xl'>404 - Page Not Found</h2>
            </div>
            <div className='text-xl m-4'>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </div>
            <Link href="/">
                <a className={`${styles.player_page_stats} hover:border hover:border-blue-600 hover:text-blue-500`}>Return Home</a>
            </Link>
        </div>
    );
}