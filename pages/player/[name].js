import * as React from 'react';
import ReactCountryFlag from "react-country-flag"
import Head from 'next/head'
import mysql from 'mysql2'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

import MogiHistory from '../../components/MogiHistory';



export async function getServerSideProps(context) {
  const player = context.query.name
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
      `SELECT p.player_id, 
      p.country_code as "country", 
      p.player_name as "player name", 
      p.mmr as "mmr", 
      p.peak_mmr as "peak mmr", 
      ROUND((wintable.wins/pm.events_played)*100,2) as "win rate",
      CONCAT(tenpm.wins, "-", tenpm.losses) as "win/loss (last 10)",
      tenpm.last_ten_change as "gain/loss (last 10)",
      pm.events_played as "events played",
      pm.largest_gain as "largest gain",
      pm.largest_loss as "largest loss",
      r.rank_name
      FROM player as p 
      JOIN ranks as r ON r.rank_id = p.rank_id 
      JOIN (SELECT ten.player_id, SUM(CASE WHEN ten.mmr_change > 0 THEN 1 ELSE 0 END) as wins, SUM(CASE WHEN ten.mmr_change <= 0 THEN 1 ELSE 0 END) as losses, SUM(ten.mmr_change) as last_ten_change
		    FROM (SELECT pm.player_id, pm.mmr_change, m.create_date FROM (SELECT mogi_id, create_date FROM mogi ORDER BY create_date DESC) as m JOIN player_mogi pm ON m.mogi_id = pm.mogi_id JOIN player ON pm.player_id = player.player_id WHERE player.player_name = ? ORDER BY m.create_date DESC LIMIT 10) as ten
		    GROUP BY ten.player_id) as tenpm
      ON p.player_id = tenpm.player_id
      JOIN (SELECT player_id, count(*) as events_played, MAX(mmr_change) as largest_gain, MIN(mmr_change) as largest_loss FROM player_mogi GROUP BY player_id) as pm
      ON p.player_id = pm.player_id
        JOIN (SELECT player_id, sum(if(mmr_change>0,1,0)) as wins FROM player_mogi GROUP BY player_id) as wintable
      ON wintable.player_id = p.player_id
      WHERE p.player_name= ?`, [player, player], (error, results) => {
      if (error) reject(error);
      else resolve(results);
    }
    );
  }
  );
  results = JSON.parse(JSON.stringify(results))

  // mogi history
  let rows = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT pm.mogi_id, pm.mmr_change, pm.new_mmr, CONCAT(if(t.tier_name="sq","squad queue",CONCAT("tier-",t.tier_name))," ", if(m.mogi_format=1,"FFA",CONCAT(m.mogi_format,"v",m.mogi_format))) as title, UNIX_TIMESTAMP(m.create_date) as create_date
      FROM player_mogi pm 
      JOIN mogi m ON pm.mogi_id = m.mogi_id 
      JOIN tier t on m.tier_id = t.tier_id
      WHERE pm.player_id = ?
      ORDER BY m.create_date DESC`, [results[0].player_id], (error, rows) => {
      if (error) reject(error);
      else resolve(rows);
    }
    );
  });
  rows = JSON.parse(JSON.stringify(rows))

  // largest gain
  let lg = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT mogi_id FROM player_mogi WHERE player_id = ? AND mmr_change = ?`, [results[0].player_id, results[0]["largest gain"]], (error, lg) => {
        if (error) reject(error);
        else resolve(lg);
      }
    );
  });
  lg = JSON.parse(JSON.stringify(lg))

  // largest loss
  let ll = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT mogi_id FROM player_mogi WHERE player_id = ? AND mmr_change = ?`, [results[0].player_id, results[0]["largest loss"]], (error, ll) => {
        if (error) reject(error);
        else resolve(ll);
      }
    );
  });
  ll = JSON.parse(JSON.stringify(ll))

  // // partner avg
  // let pa = await new Promise((resolve, reject) => {
  //   connection.query(
  //     `SELECT ROUND(AVG(score),2) as pa FROM (SELECT player_id, mogi_id, place, score FROM player_mogi WHERE player_id <> ? AND (mogi_id, place) IN (SELECT mogi_id, place FROM player_mogi WHERE player_id = ?)) as table2;`, [results[0].player_id, results[0].player_id], (error, pa) => {
  //       if (error) reject(error);
  //       else resolve(pa);
  //     }
  //   );
  // });
  // pa = JSON.parse(JSON.stringify(pa))

  // partner avg2
  let pa = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT ROUND(AVG(score),2) as pa FROM (SELECT pm.player_id, pm.mogi_id, pm.place, pm.score, pm.mmr_change FROM player_mogi as pm INNER JOIN (SELECT pm.mogi_id, pm.place, pm.mmr_change FROM player_mogi as pm JOIN mogi as m on pm.mogi_id = m.mogi_id WHERE pm.player_id = ? ORDER BY m.create_date DESC) as pm2 ON pm2.mogi_id = pm.mogi_id AND pm2.place = pm.place AND pm.mmr_change = pm2.mmr_change WHERE player_id <> ?) as a;`, [results[0].player_id, results[0].player_id], (error, pa) => {
        if (error) reject(error);
        else resolve(pa);
      }
    );
  });
  pa = JSON.parse(JSON.stringify(pa))

  // # rank
  let rank = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(player_id) as "rank" FROM player WHERE mmr >= ?`, [results[0]["mmr"]], (error, rank) => {
        if (error) reject(error);
        else resolve(rank);
      }
    );
  });
  rank = JSON.parse(JSON.stringify(rank))

  // score stuff
  let score_stuff = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT MAX(score) as "top score", ROUND(AVG(score),2) as "avg score" FROM player_mogi WHERE player_id = ?`, [results[0].player_id], (error, score_stuff) => {
        if (error) reject(error);
        else resolve(score_stuff);
      }
    );
  });
  score_stuff = JSON.parse(JSON.stringify(score_stuff))

  let grid_color = 'a'

  // End connection to server
  connection.end();
  // return props as object ALWAYS
  return {
    props: { results, rows, lg, ll, pa, rank, score_stuff, grid_color }
  }
}




export default function Player({ results, rows, lg, ll, pa, rank, score_stuff, grid_color }) {



  return (
    <div className={styles.container}>
      <Head>
        <title>Player Details | 200 Lounge</title>
        <meta name="description" content="200 Lounge Player Profile" />
        <link rel="icon" href="/200.png" />
      </Head>

      <main className={styles.main}>
        {/* <TileGrid /> */}
        <div className='flex flex-row flex-wrap max-w-4xl m-auto justify-center z-10'>
        <h1 className={styles.title}>
          <div className={results[0].rank_name === "Grandmaster" ? 'text-red-800' : results[0].rank_name === "Master" ? 'text-violet-700' : results[0].rank_name === "Diamond" ? 'dark:text-cyan-200 text-cyan-500' : results[0].rank_name === "Platinum" ? 'dark:text-cyan-600 text-cyan-900' : results[0].rank_name === "Gold" ? 'text-yellow-500' : results[0].rank_name === "Silver" ? 'text-gray-400' : results[0].rank_name === "Bronze" ? 'text-orange-400' : results[0].rank_name === "Iron" ? 'text-stone-500' : 'text-white'}><ReactCountryFlag countryCode={results[0]["country"]} style={{ width: '4rem', height: '4rem' }} svg /> {results[0]["player name"]} - {results[0].rank_name}</div>
        </h1>
          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>Rank</h2>
            <div>{rank[0]["rank"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>mmr</h2>
            <div className={results[0]["mmr"] >= 11000 ? 'text-red-800' : results[0]["mmr"] >= 9000 ? 'text-violet-700' : results[0]["mmr"] >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : results[0]["mmr"] >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : results[0]["mmr"] >= 4500 ? 'text-yellow-500' : results[0]["mmr"] >= 3000 ? 'text-gray-400' : results[0]["mmr"] >= 1500 ? 'text-orange-400' : 'text-stone-500'}>{results[0]["mmr"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>peak mmr</h2>
            <div className={results[0]["peak mmr"] >= 11000 ? 'text-red-800' : results[0]["peak mmr"] >= 9000 ? 'text-violet-700' : results[0]["peak mmr"] >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : results[0]["peak mmr"] >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : results[0]["peak mmr"] >= 4500 ? 'text-yellow-500' : results[0]["peak mmr"] >= 3000 ? 'text-gray-400' : results[0]["peak mmr"] >= 1500 ? 'text-orange-400' : 'text-stone-500'}>{results[0]["peak mmr"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>win rate</h2>
            <div>{results[0]["win rate"]}%</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>win/loss (last 10)</h2>
            <div>{results[0]["win/loss (last 10)"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>+/- (last 10)</h2>
            <div>{results[0]["gain/loss (last 10)"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>avg score</h2>
            <div>{score_stuff[0]["avg score"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>top score</h2>
            <div>{score_stuff[0]["top score"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>events played</h2>
            <div>{results[0]["events played"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>largest gain</h2>
            <div className='cursor-pointer hover:underline dark:text-cyan-300 text-blue-500'><Link href={"/mogi/" + lg[0].mogi_id}>{results[0]["largest gain"]}</Link></div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>largest loss</h2>
            <div className='cursor-pointer hover:underline dark:text-cyan-300 text-blue-500'><Link href={"/mogi/" + ll[0].mogi_id}>{results[0]["largest loss"]}</Link></div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>partner average</h2>
            <div>{pa[0]["pa"]}</div>
          </div>

        </div>
        <div className="m-auto p-1 z-10">
          <MogiHistory rows={rows} />
        </div>
      </main>
    </div>
  )
}
