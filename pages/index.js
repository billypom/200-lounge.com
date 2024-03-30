import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import mysql from 'mysql2'
import styles from '../styles/Home.module.css'
import Leaderboard from '../components/Leaderboard'

export async function getServerSideProps(context) {
  const season = context.query.season || 7
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
  try {
    // Store table results
    let rows = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT p.player_id, 
      RANK() OVER ( ORDER BY p.mmr DESC ) as "Rank",
      p.country_code as "Country", 
      p.player_name as "Player Name", 
      p.mmr as "MMR", 
      p.peak_mmr as "Peak MMR", 
      (wintable.wins/pm.events_played) as "Win Rate",
      pm.events_played as "Events Played",
      (
        SELECT ROUND(AVG(score),2) as pa 
        FROM (
          -- Get all scores where we are NOT the current player, and we are on the same team (same place)
          SELECT pm.player_id, pm.mogi_id, pm.place, pm.score, pm.mmr_change 
          FROM player_mogi as pm 
          INNER JOIN (
            -- Get every mogi and placement that the current player participated in
            SELECT pm2.mogi_id, pm2.place, pm2.mmr_change 
            FROM player_mogi as pm2 
            JOIN mogi as m on pm2.mogi_id = m.mogi_id 
            WHERE pm2.player_id = p.player_id
            ) 
          as pm2 
          ON pm2.mogi_id = pm.mogi_id 
          AND pm2.place = pm.place 
          AND pm2.mmr_change = pm.mmr_change
          WHERE player_id <> p.player_id) 
        as a
      ) "Partner AVG",
      (
        SELECT ROUND(AVG(score),2) FROM player_mogi WHERE player_id = p.player_id
      ) "AVG Score",
      pm.largest_gain as "Largest Gain",
      pm.largest_loss as "Largest Loss"
      FROM player as p 
      JOIN (
        SELECT player_id, count(*) as events_played, MAX(mmr_change) as largest_gain, MIN(mmr_change) as largest_loss 
          FROM player_mogi 
          GROUP BY player_id) 
      as pm
      ON p.player_id = pm.player_id
      JOIN (
        SELECT player_id, sum(if(mmr_change>0,1,0)) as wins 
          FROM player_mogi 
          GROUP BY player_id) 
      as wintable
      ON wintable.player_id = p.player_id`, (error, rows) => {
        if (error) reject(error);
        else resolve(rows);
      }
      );
    }
    );
    rows = JSON.parse(JSON.stringify(rows).replace(/\:null/gi, "\:\"\""))
    // return props as object ALWAYS
    if (rows.length === 0) {
      rows = await new Promise((resolve, reject) => {
        connection.query(
          `SELECT
        0 as "Rank",
        0 as "Country", 
        0 as "Player Name", 
        0 as "MMR", 
        0 as "Peak MMR",
        0 as "Win Rate",
        0 as "Win/Loss (Last 10)",
        0 as "Gain/Loss (Last 10)",
        0 as "Events Played",
        0 as "Partner AVG",
        0 as "AVG Score",
        0 as "Largest Gain",
        0 as "Largest Loss"`, (error, rows) => {
          if (error) reject(error)
          else resolve(rows)
        }
        );
      }
      )
      rows = JSON.parse(JSON.stringify(rows).replace(/\:null/gi, "\:\"\""))
    }

    let countries = await new Promise((resolve, reject) => {
      connection.query('select distinct country_code from player where peak_mmr is not null order by country_code ASC;', (error, countries) => {
        if (error) reject(error)
        else resolve(countries)
      })
    })
    countries = JSON.parse(JSON.stringify(countries))



    let current_season = process.env.current_season
    return {
      props: { rows, current_season, countries }
    }
  } finally {
    // End connection to server
    connection.end();
  }
}





export default function Home({ rows, current_season, countries }) {

  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, [width, updateTarget]);

    return targetReached;
  };

  const isMobile = useMediaQuery(1000)

  return (
    <div className={styles.container}>
      {/* <TileGrid /> */}
      <Head>
        <title>200 Lounge | Leaderboard</title>
        <meta name="description" content="MK8DX 200cc Lounge Leaderboard" />
        <link rel="icon" href="/200.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Leaderboard
        </h1>
        <div className='flex flex-col w-full m-auto justify-center items-center text-center z-10'>
          <Leaderboard rows={rows} season={current_season} isMobile={isMobile} countries={countries} />
        </div>
      </main>
    </div>
  );
}
