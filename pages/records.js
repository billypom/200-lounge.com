import Head from 'next/head'
import mysql from 'mysql2'
import styles from '../styles/Home.module.css'
import RecordsTable from '../components/RecordsTable';


export async function getServerSideProps() {
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
  connection.connect();
  const results = []
  const expected_names = ["all1", "all2", "all3", "all4", "a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4", "c1", "c2", "c3", "c4", "sq2", "sq3", "sq4", "sq6"]
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

  // today's top score
  // all time top score
  // # of mogis today

  
  // select p.player_name, p.mmr from player p join player_mogi
  // where player_mogi.score = (select max(pm.score) from player_mogi pm join mogi m on pm.mogi_id = m.mogi_id where m.create_date = CURDATE());

  // select p.player_name, p.mmr from player p join player_mogi
  // where player_mogi.score = (select max(pm.score) from player_mogi pm join mogi m on pm.mogi_id = m.mogi_id where m.create_date = '2022-11-15');


  // select 
  // select pm.player_id, pm.score from player_mogi pm join mogi m on pm.mogi_id = m.mogi_id where m.create_date > '2022-11-16';



  // let todays_top_scorer = await new Promise((resolve, reject) => {
  //   connection.query(
  //     ``
  //   )
  // })
  connection.end();
  const all1 = results[0]
  const all2 = results[1]
  const all3 = results[2]
  const all4 = results[3]

  const a1 = results[4]
  const a2 = results[5]
  const a3 = results[6]
  const a4 = results[7]
  
  const b1 = results[8]
  const b2 = results[9]
  const b3 = results[10]
  const b4 = results[11]
  
  const c1 = results[12]
  const c2 = results[13]
  const c3 = results[14]
  const c4 = results[15]
  
  const sq2 = results[16]
  const sq3 = results[17]
  const sq4 = results[18]
  const sq6 = results[19]


  // console.log(results)
  return {
    props: { all1, all2, all3, all4, a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, sq2, sq3, sq4, sq6 }
  }
}


export default function Records({ all1, all2, all3, all4, a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, sq2, sq3, sq4, sq6 }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>200 Lounge | Records</title>
        <meta name="description" content="MK8DX 200cc Lounge Records" />
        <link rel="icon" href="/200.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          records
        </h1>

        <div className="flex flex-col text-center z-10 items-center">
            <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>tier all</h2>
              {/* <div className={styles.tier_title_background}></div> */}
          <div className="flex flex-row flex-wrap">
            <RecordsTable data={all1} title='FFA'></RecordsTable>
            <RecordsTable data={all2} title='2v2'></RecordsTable>
            <RecordsTable data={all3} title='3v3'></RecordsTable>
            <RecordsTable data={all4} title='4v4'></RecordsTable>
          </div>

          <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>tier a</h2>
          <div className="flex flex-row flex-wrap">
            <RecordsTable data={a1} title='FFA'></RecordsTable>
            <RecordsTable data={a2} title='2v2'></RecordsTable>
            <RecordsTable data={a3} title='3v3'></RecordsTable>
            <RecordsTable data={a4} title='4v4'></RecordsTable>
          </div>

          <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>tier b</h2>
          <div className="flex flex-row flex-wrap">
            <RecordsTable data={b1} title='FFA'></RecordsTable>
            <RecordsTable data={b2} title='2v2'></RecordsTable>
            <RecordsTable data={b3} title='3v3'></RecordsTable>
            <RecordsTable data={b4} title='4v4'></RecordsTable>
          </div>
            
          <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>tier c</h2>
          <div className="flex flex-row flex-wrap">
            <RecordsTable data={c1} title='FFA'></RecordsTable>
            <RecordsTable data={c2} title='2v2'></RecordsTable>
            <RecordsTable data={c3} title='3v3'></RecordsTable>
            <RecordsTable data={c4} title='4v4'></RecordsTable>
          </div>

          <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>squad queue</h2>
          <div className="flex flex-row flex-wrap">
            <RecordsTable data={sq2} title='2v2'></RecordsTable>
            <RecordsTable data={sq3} title='3v3'></RecordsTable>
            <RecordsTable data={sq4} title='4v4'></RecordsTable>
            <RecordsTable data={sq6} title='6v6'></RecordsTable>
          </div>
        </div>
      </main>
    </div>
  );
}