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

    // Count of all players
    let stuff4 = await new Promise((resolve, reject) => {
      connection.query('SELECT count(*) as count FROM player;', [], (error, stuff4) => {
        if (error) reject(error)
        else resolve(stuff4)
      })
    })
    const total_registered_players = JSON.parse(JSON.stringify(stuff4))


    res.status(200).json({ total_registered_players });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('API Success | getCountOfAllRegisteredPlayers')
    connection.end();
  }
}

