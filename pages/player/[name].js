import Head from 'next/head'
import mysql from 'mysql2'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'


// Create MySQL connection - Populate Q&A
export async function getServerSideProps() {
  const router = useRouter()
  const { playerName } = router.query
  const connection = mysql.createConnection(
    {
      host: process.env.db_host,
      user: process.env.db_username,
      password: process.env.db_password,
      database: process.env.db_database,
      insecureAuth: true,
    }
  )
  // Connect to server
  connection.connect();
  // Store table results
  let results = await new Promise((resolve, reject) => {
    connection.query(
      'SELECT player_name, mkc_id, country_code, twitch_link, mmr, peak_mmr FROM player WHERE player_name = ?;', [playerName], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      }
    );
  }
  );
  // Parse mysql output into json table
  results = JSON.parse(JSON.stringify(results))
  // console.log(results)
  // End connection to server
  connection.end();
  // return props as object ALWAYS
  return {
    props: { results }
  }
}


export default function Home({results}) {
  const items = results.map((results) =>
    <p key={results.id} loading="lazy">
      <p className={styles.description}>name: {results.player_name}</p><br></br><p className={styles.description}>mmr: {results.mmr}</p>
    </p>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>results.player_name | 200 Lounge</title>
        <meta name="description" content="200 Lounge Player Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          under construction
        </h1>
        <div className='max-w-2xl'>
            {items}
          </div>
      </main>
    </div>
  )
}
