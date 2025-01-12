

import mysql from 'mysql2';

export const config = {
  api: {
    responseLimit: '512kb',
  },
}
export default async function handler(req, res) {
  const season = req.query.season || 7
  const db_choice = `s${season}200lounge`
  const connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_username,
    password: process.env.db_password,
    database: db_choice,
    insecureAuth: true,
    supportBigNumbers: true,
  });

  try {
    connection.connect();

    // Count of all mogis
    let stuff6 = await new Promise((resolve, reject) => {
      connection.query('SELECT count(*) as count FROM mogi;', [], (error, stuff6) => {
        if (error) reject(error)
        else resolve(stuff6)
      })
    })
    const total_mogis_played = JSON.parse(JSON.stringify(stuff6))


    res.status(200).json({ total_mogis_played });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('API Success | getCountOfAllMogis')
    connection.end();
  }
}

