import Head from 'next/head'
import Image from 'next/image'
import mysql from 'mysql2'
import styles from '../styles/Home.module.css'
import { DataGrid } from '@mui/x-data-grid';


export async function getServerSideProps(context) {
  // console.log(context)
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
      'SELECT player_id, player_name, mkc_id, country_code, twitch_link, mmr, peak_mmr FROM player;', (error, results) => {
        if (error) reject(error);
        else resolve(results);
      }
    );
  }
  );
  // Parse mysql output into json table
  results = JSON.parse(JSON.stringify(results))
  // End connection to server
  connection.end();
  // return props as object ALWAYS
  return {
    props: { results }
  }
}

const columns = [
  { field: 'player_name', headerName: 'player name', headerAlign: 'center', headerClassName: ''},
  { field: 'mkc_id', headerName: 'mkc id'},
  { field: 'country_code', headerName: 'country'},
  { field: 'twitch_link', headerName: 'twitch'},
  { field: 'mmr', headerName: 'mmr'},
  { field: 'peak_mmr', headerName: 'peak mmr'},
];

export default function Home({results}) {
  console.log(results)
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
        <div style={{height: 600, width: '100%'}}>
          <DataGrid
            getRowId={results => results.player_id}
            rows={results}
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[20]}
            sx={{
              boxShadow: 2,
              border: 2,
              color: 'white',
            }}
          />
        </div>
      </main>

    </div>
  )
}
