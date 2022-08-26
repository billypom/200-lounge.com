// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql2'

export default async function handler(req, res) {
  const mkc = req.query.id
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

  let results = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT mkc_id, player_id, player_name, country_code, unban_date FROM player WHERE mkc_id = ?;`, [mkc], (error, results) => {
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
  res.status(200).json(results);
}