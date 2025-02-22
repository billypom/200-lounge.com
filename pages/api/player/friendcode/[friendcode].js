// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql2'

export default async function handler(req, res) {
  const player = req.query.friendcode
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
  try {
    let results = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT p.player_id, 
      p.player_name, 
      p.mmr, 
      p.peak_mmr, 
      pm.events_played as "events_played"
      FROM player as p 
      JOIN (SELECT player_id, count(*) as events_played FROM player_mogi GROUP BY player_id) as pm
      ON p.player_id = pm.player_id
      WHERE p.fc= ?`, [player], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      }
      );
    }
    );
    // Parse mysql output into json table
    results = JSON.parse(JSON.stringify(results))
    // return props as object ALWAYS
    res.status(200).json(results);
  } finally {
    // End connection to server
    connection.end();
  }
}
