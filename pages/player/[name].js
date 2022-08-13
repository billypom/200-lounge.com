import Head from 'next/head'
import mysql from 'mysql2'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { DataGrid } from '@mui/x-data-grid';


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
      supportBigNumbers: true,
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

  connection.connect();
  let pm_results = await new Promise((resolve, reject) => {
    connection.query(
      'SELECT pm.mogi_id, pm.mmr_change, m.mogi_format FROM player_mogi pm JOIN mogi m ON pm.mogi_id = m.mogi_id WHERE pm.player_id = ?;', [results[0].player_id], (error, pm_results) => {
        if (error) reject(error);
        else resolve(pm_results);
      }
    );
  });
  pm_results = JSON.parse(JSON.stringify(pm_results))
  console.log(pm_results)

  // End connection to server
  connection.end();
  // return props as object ALWAYS
  return {
    props: { results, pm_results }
  }
}


export default function Player({results, pm_results}) {
  const player_items = results.map((results) =>
    <tr key={results.player_id}>
      <td className={styles.description}>{results.player_name}</td>
      <td className={styles.description}>{results.country_code}</td>
      <td className={styles.description}>{results.mmr}</td>
      <td className={styles.description}>{results.peak_mmr}</td>
      <td className={styles.description}><a href={"https://mariokartcentral.com/mkc/registry/players/" + results.mkc_id}>MKC</a></td>
      <td className={styles.description}><a href={"https://twitch.tv/" + results.twitch_link}>Twitch</a></td>
    </tr>
  )

  const mogi_items = pm_results.map((pm_results) =>
    <tr key={pm_results.mogi_id}>
      <td className={styles.description}><Link href={"/mogi/" + pm_results.mogi_id}>Mogi</Link></td>
      <td className={styles.description}>{pm_results.mmr_change}</td>
    </tr>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Player Details | 200 Lounge</title>
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
            {player_items}
          </table>
        </div>
        <div className='max-w-2xl'>
          <table>
            <tr>
              <th>Mogi</th>
              <th>MMR +/-</th>
            </tr>
            {mogi_items}
          </table>
        </div>
      </main>
    </div>
  )
}
