// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql2'

export default async function handler(req, res) {
  const player = req.query.name
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
      `SELECT RANK() OVER ( ORDER BY p.mmr DESC ) as "rank",
      p.country_code, 
      p.player_name, 
      p.mmr, 
      p.peak_mmr,
      ROUND((wintable.wins/pm.events_played)*100,2) as win_rate,
      CONCAT(tenpm.wins, "-", tenpm.losses) as last_10_win_loss,
      tenpm.last_ten_change as last_10_gain_loss,
      pm.events_played as events_played,
      pm.largest_gain as largest_gain,
      pm.largest_loss as largest_loss,
      r.rank_name
      FROM player as p 
      JOIN ranks as r ON r.rank_id = p.rank_id 
      JOIN (SELECT ten.player_id, SUM(CASE WHEN ten.mmr_change > 0 THEN 1 ELSE 0 END) as wins, SUM(CASE WHEN ten.mmr_change <= 0 THEN 1 ELSE 0 END) as losses, SUM(mmr_change) as last_ten_change
        FROM (SELECT player_id, mmr_change FROM (SELECT mogi_id FROM mogi ORDER BY create_date DESC LIMIT 10) as m JOIN player_mogi ON m.mogi_id = player_mogi.mogi_id) as ten
        GROUP BY player_id) as tenpm
      ON p.player_id = tenpm.player_id
      JOIN (SELECT player_id, count(*) as events_played, MAX(mmr_change) as largest_gain, MIN(mmr_change) as largest_loss FROM player_mogi GROUP BY player_id) as pm
      ON p.player_id = pm.player_id
        JOIN (SELECT player_id, sum(if(mmr_change>0,1,0)) as wins FROM player_mogi GROUP BY player_id) as wintable
      ON wintable.player_id = p.player_id
      WHERE p.player_name= ?`, [player] , (error, results) => {
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
