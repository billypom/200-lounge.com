import Head from 'next/head'
import mysql from 'mysql2'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'


// Create MySQL connection - Populate Q&A
export async function getServerSideProps(context) {
  // console.log(context)
  const { params } = context
  const mogi_id = params.id
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
  // console.log(results)
  console.log(results)
  // End connection to server
  connection.end();
  // return props as object ALWAYS
  return {
    props: { results }
  }
}


export default function Mogi({results}) {
    const items = results.map((results) =>
    <p key={results.mogi_id}>
        <Image src={results.table_url} alt='mogi results image' width='860' height='520'></Image>
    </p>
  )
  console.log(`${results.table_url}`)

  return (
    <div className={styles.container}>
      <Head>
        <title>Mogi Details | 200 Lounge</title>
        <meta name="description" content="200 Lounge Player Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          under construction
        </h1>
        <div className='max-w-2xl'>
            {items}
          </div>
      </main>
    </div>
  )
}
