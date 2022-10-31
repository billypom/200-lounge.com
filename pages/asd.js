import styles from '../styles/Home.module.css'
import Head from 'next/head'
import TileGrid from '../components/TileGrid'

export default function asd({ rows }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>200 Lounge</title>
        <meta name="description" content="MK8DX 200cc Lounge Leaderboard" />
        <link rel="icon" href="/200.png" />
      </Head>
      <main className={styles.main}>
        <TileGrid />
        <h1 className={styles.title}>
          {/* {width}x{height} | {tiles_columns}x{tiles_rows} | {quantity} */}
          hey
        </h1>
      </main>
  </div>
  )
  }