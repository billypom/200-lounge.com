// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql2'

export default async function handler(req, res) {
  const mogi = req.query.id
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

  let pm = await new Promise((resolve, reject) => {
    connection.query(
      `select pm.place, p.player_name, pm.prev_mmr, pm.mmr_change, pm.new_mmr
      FROM player_mogi as pm 
      JOIN player as p ON p.player_id = pm.player_id
      WHERE pm.mogi_id = ?
      ORDER BY pm.place ASC`, [mogi], (error, pm) => {
        if (error) reject(error);
        else resolve(pm);
      }
    );
  }
  );
  // Parse mysql output into json table
  pm = JSON.parse(JSON.stringify(pm))
  // End connection to server
  connection.end();
  res.status(200).json(pm);
}