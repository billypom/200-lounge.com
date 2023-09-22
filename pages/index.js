import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import mysql from 'mysql2'
import styles from '../styles/Home.module.css'
import Leaderboard from '../components/Leaderboard'

export async function getServerSideProps(context) {
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
  let rows = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT p.player_id, 
      RANK() OVER ( ORDER BY p.mmr DESC ) as "rank",
      p.country_code as "country", 
      p.player_name as "player name", 
      p.mmr as "mmr", 
      p.peak_mmr as "peak mmr", 
      (wintable.wins/pm.events_played) as "win rate",
      pm.events_played as "events played",
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
            ORDER BY m.create_date DESC) 
          as pm2 
          ON pm2.mogi_id = pm.mogi_id 
          AND pm2.place = pm.place 
          AND pm2.mmr_change = pm.mmr_change
          WHERE player_id <> p.player_id) 
        as a
      ) "partner avg",
      (
        SELECT ROUND(AVG(score),2) FROM player_mogi WHERE player_id = p.player_id
      ) "avg score",
      pm.largest_gain as "largest gain",
      pm.largest_loss as "largest loss"
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
        0 as "rank",
        0 as "country", 
        0 as "player name", 
        0 as "mmr", 
        0 as "peak mmr",
        0 as "win rate",
        0 as "win/loss (Last 10)",
        0 as "gain/loss (Last 10)",
        0 as "events played",
        0 as "partner avg",
        0 as "avg score",
        0 as "largest gain",
        0 as "largest loss"`, (error, rows) => {
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


  // End connection to server
  connection.end();
  let current_season = process.env.current_season
  return {
    props: { rows, current_season, countries }
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
          leaderboard
        </h1>
        <div className='flex flex-col w-full m-auto justify-center items-center text-center z-10'>
          <Leaderboard rows={rows} season={current_season} isMobile={isMobile} countries={countries} />
        </div>
      </main>
    </div>
  );
}