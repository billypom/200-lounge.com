import * as React from 'react';
import Head from 'next/head'
import mysql from 'mysql2'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import MMRTable from '../../components/MMRTable';



export async function getServerSideProps(context) {
  const mogi_id = context.query.id
  const season = context.query.season || 6
  const db_choice = `s${season}200lounge`
  const connection = mysql.createConnection(
    {
      host: process.env.db_host,
      user: process.env.db_username,
      password: process.env.db_password,
      database: db_choice,
      insecureAuth: true,
      supportBigNumbers: true,
    }
  )
  // Connect to server
  connection.connect();
  // Store table results
  let results = await new Promise((resolve, reject) => {
    connection.query(
      'SELECT m.mogi_id, m.table_url, t.tier_name FROM mogi m JOIN tier t ON m.tier_id = t.tier_id WHERE mogi_id = ? LIMIT 1;', [mogi_id], (error, results) => {
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

  const total_mmr = pm.reduce((accumulator, currentValue) => accumulator + currentValue.prev_mmr, 0)
  const avg_room_mmr = Math.round(total_mmr / pm.length)




  // End connection to server
  connection.end();
  // return props as object ALWAYS
  return {
    props: { results, pm, avg_room_mmr }
  }
}


export default function Mogi({ results, pm, avg_room_mmr }) {
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
          tier-{results[0].tier_name} mogi
          </h1>
          {/* <div className='max-w-2xl pt-5 z-10 m-auto justify-center'> */}
          {results[0].table_url ? <Image src={results[0].table_url} alt='mogi results image' width={860} height={520} priority></Image> : <div className='m-10'>Lorenzi Table Image Not Found</div>}

          <div className='flex flex-row flex-wrap w-full justify-center'>

            <div className={styles.player_page_stats}>
                <h2 className='text-md font-bold'>Average Room MMR:</h2>
                  <div className={avg_room_mmr >= 11000 ? 'text-red-800' : avg_room_mmr >= 9000 ? 'text-violet-700' : avg_room_mmr >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : avg_room_mmr >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : avg_room_mmr >= 4500 ? 'text-yellow-500' : avg_room_mmr >= 3000 ? 'text-gray-400' : avg_room_mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                    {avg_room_mmr}
                  </div>
            </div>

          </div>

          <div className='max-w-9xl'>
            <MMRTable rows={pm} />
          </div>
        </div>
      </main>
    </div>
  )
}
