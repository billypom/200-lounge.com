import styles from '../styles/Home.module.css'
import Head from 'next/head'

export default function Leaderboard({ rows }) {
    return (
      <div className={styles.container}>
        <Head>
          <title>200 Lounge</title>
          <meta name="description" content="MK8DX 200cc Lounge Leaderboard" />
          <link rel="icon" href="/200.png" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>
            coming soon...
          </h1>
        </main>
    </div>
    )
  }