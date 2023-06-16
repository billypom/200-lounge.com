import * as React from 'react';
import Head from 'next/head'
import mysql from 'mysql2'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import MMRTable from '../../components/MMRTable';



export async function getServerSideProps(context) {
  const mogi_id = context.query.id
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
      'SELECT mogi_id, table_url FROM mogi WHERE mogi_id = ? LIMIT 1;', [mogi_id], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      }
    );
  }
  );
  // Parse mysql output into json table
  results = JSON.parse(JSON.stringify(results))


  let pm = await new Promise((resolve, reject) => {
    connection.query(
      `select p.player_name, pm.player_id, pm.prev_mmr, pm.mmr_change, pm.new_mmr, pm.place
      FROM player_mogi as pm 
      JOIN player as p ON p.player_id = pm.player_id
      WHERE pm.mogi_id = ?
      ORDER BY pm.place ASC`, [mogi_id], (error, pm) => {
      if (error) reject(error);
      else resolve(pm);
    }
    );
  }
  );
  // Parse mysql output into json table
  pm = JSON.parse(JSON.stringify(pm))




  // End connection to server
  connection.end();
  // return props as object ALWAYS
  return {
    props: { results, pm }
  }
}


export default function Mogi({ results, pm }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mogi Details | 200 Lounge</title>
        <meta name="description" content="200 Lounge Mogi Details" />
        <link rel="icon" href="/200.png" />
      </Head>

      <main className={styles.main}>
          {/* <TileGrid /> */}
          <div className='flex flex-col w-full m-auto justify-center items-center text-center z-10'>
            <h1 className={styles.title}>
              mogi
            </h1>
            {/* <div className='max-w-2xl pt-5 z-10 m-auto justify-center'> */}
              <Image src={results[0].table_url} alt='mogi results image' width='860' height='520'></Image>
              <div className='max-w-9xl'>
                <MMRTable rows={pm} />
              </div>
          </div>
      </main>
    </div>
  )
}
