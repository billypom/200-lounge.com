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

    // Median MMR
    let stuff8 = await new Promise((resolve, reject) => {
      connection.query('SELECT ROUND(AVG(sub.mmr),0) AS median FROM (SELECT s.mmr, COUNT(*) AS count_all, SUM(CASE WHEN s2.mmr <= s.mmr THEN 1 ELSE 0 END) AS my_rank FROM player s JOIN player s2 ON 1=1 GROUP BY s.mmr HAVING my_rank - 1 <= count_all / 2 AND my_rank + 1 >= count_all / 2 ORDER BY s.mmr) sub;', [], (error, stuff8) => {
        if (error) reject(error)
        else resolve(stuff8)
      })
    })
    const median_mmr = JSON.parse(JSON.stringify(stuff8))


    res.status(200).json({ median_mmr });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('API Success | getMedianMMR')
    connection.end();
  }
}

