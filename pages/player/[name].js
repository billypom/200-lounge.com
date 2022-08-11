import Head from 'next/head'
import mysql from 'mysql2'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'


// Create MySQL connection - Populate Q&A
export async function getServerSideProps(context) {
  // console.log(context)
  const { params } = context
  const player = params.name
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
      'SELECT player_id, player_name, mkc_id, country_code, twitch_link, mmr, peak_mmr FROM player WHERE player_name = ? LIMIT 1;', [player], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      }
    );
  }
  );
  // Parse mysql output into json table
  results = JSON.parse(JSON.stringify(results))
  // console.log(results)
  console.log(results)
  // End connection to server
  connection.end();
  // return props as object ALWAYS
  return {
    props: { results }
  }
}


export default function Home({results}) {
  const items = results.map((results) =>
    <tr key={results.player_id}>
      <td className={styles.description}>{results.player_name}</td>
      <td className={styles.description}>{results.country_code}</td>
      <td className={styles.description}>{results.mmr}</td>
      <td className={styles.description}>{results.peak_mmr}</td>
      <td className={styles.description}><a href={"https://mariokartcentral.com/mkc/registry/players/" + results.mkc_id}>MKC</a></td>
      <td className={styles.description}><a href={"https://twitch.tv/" + results.twitch_link}>Twitch</a></td>
    </tr>
  )
  const player_name = results.player_name

  return (
    <div className={styles.container}>
      <Head>
        <title>{player_name} | 200 Lounge</title>
        <meta name="description" content="200 Lounge Player Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          under construction
        </h1>
        <div className='max-w-2xl'>
          <table>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>MMR</th>
              <th>Peak MMR</th>
              <th>MKC Profile</th>
              <th>Twitch Channel</th>
            </tr>
            {items}
          </table>
          </div>
      </main>
    </div>
  )
}
