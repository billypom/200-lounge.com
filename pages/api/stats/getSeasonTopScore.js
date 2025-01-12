import mysql from 'mysql2';

export const config = {
  api: {
    responseLimit: '512kb',
  },
}
export default async function handler(req, res) {
  const connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_database,
    insecureAuth: true,
    supportBigNumbers: true,
  });

  try {
    connection.connect();

    // season top score
    let stuff = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT p.player_name, m.mogi_id, pm.score, m.create_date FROM player_mogi pm JOIN mogi m ON m.mogi_id = pm.mogi_id JOIN player p ON p.player_id = pm.player_id ORDER BY score DESC limit 1;`, [], (error, stuff) => {
          if (error) reject(error)
          else resolve(stuff)
        })
    })
    const data = JSON.parse(JSON.stringify(stuff))
    console.log(data)


    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('API Success | getSeasonTopScore')
    connection.end();
  }
}

