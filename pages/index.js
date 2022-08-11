import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


export default function Home({results}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>200 Lounge</title>
        <meta name="description" content="MK8DX 200cc Lounge Leaderboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          under construction
        </h1>
      </main>

    </div>
  )
}
