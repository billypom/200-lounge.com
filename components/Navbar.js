import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Navbar(){
    return (
        <header className={styles.navbar}>
            <Link href="/">
                <ul className={styles.navitem}>
                    leaderboard
                </ul>
            </Link>
            <Link href="/records">
                <ul className={styles.navitem}>
                    records
                </ul>
            </Link>
            <a href="https://discord.gg/uR3rRzsjhk">
                <ul className={styles.navitem}>
                    discord
                </ul>
            </a>
            <a href="https://www.mariokartcentral.com/forums/index.php?threads/s4-mk8dx-200cc-lounge-rules-updated-may-1-2022.7129/">
                <ul className={styles.navitem}>
                    rules
                </ul>
            </a>
            
        </header>
    )
}