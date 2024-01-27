import Head from 'next/head'
import mysql from 'mysql2'
import styles from '../styles/Home.module.css'
import RecordsTable from '../components/RecordsTable';


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
  connection.connect();
  try {
    const results = []
    const expected_names = ["all1", "all2", "all3", "all4", "all6", "a1", "a2", "a3", "a4", "a6", "b1", "b2", "b3", "b4", "b6", "c1", "c2", "c3", "c4", "c6", "sq2", "sq3", "sq4", "sq6"]
    for (var i = 0; i < expected_names.length; i++) {
      // Band-aid fix for players in FFA who happen to have the same score & MMR change
      // FFA formats
      if (expected_names[i].includes('1')) {
        let stuff = await new Promise((resolve, reject) => {
          connection.query(
            `select tier_format, mogi_id, score, players FROM
          (select pm.mogi_id, GROUP_CONCAT(DISTINCT t.tier_name, m.mogi_format) as tier_format, pm.place, round(sum(pm.score)) as score, round(avg(pm.mmr_change)) as mmr_change, GROUP_CONCAT(p.player_name) as players 
          from player p 
          JOIN player_mogi pm ON p.player_id = pm.player_id 
          JOIN mogi m ON pm.mogi_id = m.mogi_id 
          JOIN tier t ON t.tier_id = m.tier_id 
          group by pm.mogi_id, pm.place, pm.mmr_change, t.tier_name, p.player_id) as n
          where tier_format = ? order by score desc LIMIT 5`, [expected_names[i]], (error, stuff) => {
            if (error) reject(error);
            else resolve(stuff);
          }
          );
        }
        );
        stuff = JSON.parse(JSON.stringify(stuff).replace(/\:null/gi, "\:\"\""))
        // stuff["title"] = "tier-" + expected_names[i].slice(0, -1)
        results.push(stuff)
      } else {
        // Team formats
        let stuff = await new Promise((resolve, reject) => {
          connection.query(
            `select tier_format, mogi_id, score, players FROM
          (select pm.mogi_id, GROUP_CONCAT(DISTINCT t.tier_name, m.mogi_format) as tier_format, pm.place, round(sum(pm.score)) as score, round(avg(pm.mmr_change)) as mmr_change, GROUP_CONCAT(p.player_name) as players 
          from player p 
          JOIN player_mogi pm ON p.player_id = pm.player_id 
          JOIN mogi m ON pm.mogi_id = m.mogi_id 
          JOIN tier t ON t.tier_id = m.tier_id 
          group by pm.mogi_id, pm.place, pm.mmr_change, t.tier_name) as n
          where tier_format = ? order by score desc LIMIT 5`, [expected_names[i]], (error, stuff) => {
            if (error) reject(error);
            else resolve(stuff);
          }
          );
        }
        );
        stuff = JSON.parse(JSON.stringify(stuff).replace(/\:null/gi, "\:\"\""))
        // stuff["title"] = "tier-" + expected_names[i].slice(0, -1)
        results.push(stuff)
      }
    }

  } finally {
    connection.end();
  }
  const all1 = results[0]
  const all2 = results[1]
  const all3 = results[2]
  const all4 = results[3]
  const all6 = results[4]
  const a1 = results[5]
  const a2 = results[6]
  const a3 = results[7]
  const a4 = results[8]
  const a6 = results[9]
  const b1 = results[10]
  const b2 = results[11]
  const b3 = results[12]
  const b4 = results[13]
  const b6 = results[14]
  const c1 = results[15]
  const c2 = results[16]
  const c3 = results[17]
  const c4 = results[18]
  const c6 = results[19]
  const sq2 = results[20]
  const sq3 = results[21]
  const sq4 = results[22]
  const sq6 = results[23]


  // console.log(results)
  return {
    props: { all1, all2, all3, all4, all6, a1, a2, a3, a4, a6, b1, b2, b3, b4, b6, c1, c2, c3, c4, c6, sq2, sq3, sq4, sq6 }
  }
}


export default function Records({ all1, all2, all3, all4, all6, a1, a2, a3, a4, a6, b1, b2, b3, b4, b6, c1, c2, c3, c4, c6, sq2, sq3, sq4, sq6 }) {
  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>200 Lounge | Records</title>
        <meta name="description" content="MK8DX 200cc Lounge Records" />
        <link rel="icon" href="/200.png" />
      </Head>
      <main className={styles.main}>
        {/* <TileGrid /> */}
        <h1 className={styles.title}>
          records
        </h1>
        <div className="flex flex-col text-center z-10 items-center">
          <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>tier all</h2>
          {/* <div className={styles.tier_title_background}></div> */}
          <div className="flex flex-row flex-wrap">
            {!isObjectEmpty(all1) ? <RecordsTable data={all1} title='FFA'></RecordsTable> : <></>}
            {!isObjectEmpty(all2) ? <RecordsTable data={all2} title='2v2'></RecordsTable> : <></>}
            {!isObjectEmpty(all3) ? <RecordsTable data={all3} title='3v3'></RecordsTable> : <></>}
            {!isObjectEmpty(all4) ? <RecordsTable data={all4} title='4v4'></RecordsTable> : <></>}
            {!isObjectEmpty(all6) ? <RecordsTable data={all6} title='6v6'></RecordsTable> : <></>}
          </div>

          <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>tier a</h2>
          <div className="flex flex-row flex-wrap">
            {!isObjectEmpty(a1) ? <RecordsTable data={a1} title='FFA'></RecordsTable> : <></>}
            {!isObjectEmpty(a2) ? <RecordsTable data={a2} title='2v2'></RecordsTable> : <></>}
            {!isObjectEmpty(a3) ? <RecordsTable data={a3} title='3v3'></RecordsTable> : <></>}
            {!isObjectEmpty(a4) ? <RecordsTable data={a4} title='4v4'></RecordsTable> : <></>}
            {!isObjectEmpty(a6) ? <RecordsTable data={a6} title='6v6'></RecordsTable> : <></>}
          </div>

          <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>tier b</h2>
          <div className="flex flex-row flex-wrap">
            {!isObjectEmpty(b1) ? <RecordsTable data={b1} title='FFA'></RecordsTable> : <></>}
            {!isObjectEmpty(b2) ? <RecordsTable data={b2} title='2v2'></RecordsTable> : <></>}
            {!isObjectEmpty(b3) ? <RecordsTable data={b3} title='3v3'></RecordsTable> : <></>}
            {!isObjectEmpty(b4) ? <RecordsTable data={b4} title='4v4'></RecordsTable> : <></>}
            {!isObjectEmpty(b6) ? <RecordsTable data={b6} title='6v6'></RecordsTable> : <></>}
          </div>

          <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>tier c</h2>
          <div className="flex flex-row flex-wrap">
            {!isObjectEmpty(c1) ? <RecordsTable data={c1} title='FFA'></RecordsTable> : <></>}
            {!isObjectEmpty(c2) ? <RecordsTable data={c2} title='2v2'></RecordsTable> : <></>}
            {!isObjectEmpty(c3) ? <RecordsTable data={c3} title='3v3'></RecordsTable> : <></>}
            {!isObjectEmpty(c4) ? <RecordsTable data={c4} title='4v4'></RecordsTable> : <></>}
            {!isObjectEmpty(c6) ? <RecordsTable data={c6} title='6v6'></RecordsTable> : <></>}
          </div>

          <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>squad queue</h2>
          <div className="flex flex-row flex-wrap">
            {!isObjectEmpty(sq2) ? <RecordsTable data={sq2} title='2v2'></RecordsTable> : <></>}
            {!isObjectEmpty(sq3) ? <RecordsTable data={sq3} title='3v3'></RecordsTable> : <></>}
            {!isObjectEmpty(sq4) ? <RecordsTable data={sq4} title='4v4'></RecordsTable> : <></>}
            {!isObjectEmpty(sq6) ? <RecordsTable data={sq6} title='6v6'></RecordsTable> : <></>}
          </div>
        </div>

      </main>
    </div>
  );
}