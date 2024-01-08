import mysql from 'mysql2';

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

    const playerIds = [].concat(req.query.player_id || []);
    let query = 'SELECT player_id, player_name, mmr FROM player';
    let queryParams = [];

    if (playerIds.length > 0) {
      query += ' WHERE player_id IN (?)';
      queryParams.push(playerIds);
    }

    let results = await new Promise((resolve, reject) => {
      connection.query(query, queryParams, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

    results = JSON.parse(JSON.stringify(results));
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    connection.end();
  }
}
