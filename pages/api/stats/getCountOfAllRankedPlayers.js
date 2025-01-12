
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

    // Count of all players who have MMR
    let stuff5 = await new Promise((resolve, reject) => {
      connection.query('SELECT count(*) as count FROM player WHERE mmr IS NOT NULL;', [], (error, stuff5) => {
        if (error) reject(error)
        else resolve(stuff5)
      })
    })
    const total_ranked_players = JSON.parse(JSON.stringify(stuff5))


    res.status(200).json({ total_ranked_players });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('getCountOfAllRankedPlayers')
    connection.end();
  }
}

