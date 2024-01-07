// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql2'

export default async function handler(req, res) {
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
      `SELECT player_id, player_name, mmr FROM player;`, [], (error, results) => {
        if (error) reject(error);
        else resolve(results);
        }
      );
    }
  );
  // Parse mysql output into json table
  results = JSON.parse(JSON.stringify(results))
  // End connection to server
  connection.end();
  // return props as object ALWAYS
  res.status(200).json(results);
}