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

    // Mogi format count
    let stuff9 = await new Promise((resolve, reject) => {
      connection.query("SELECT mogi_format, COUNT(mogi_id) as mogi_count, CASE mogi_format WHEN 1 THEN 'FFA' WHEN 2 THEN '2v2' WHEN 3 THEN '3v3' WHEN 4 THEN '4v4' WHEN 6 THEN '6v6' END AS format_name FROM mogi m join tier t on m.tier_id = t.tier_id GROUP BY mogi_format order by mogi_format asc;", [], (error, stuff9) => {
        if (error) reject(error)
        else resolve(stuff9)
      })
    })
    const mogi_format_count = JSON.parse(JSON.stringify(stuff9))

    res.status(200).json({ mogi_format_count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('API Success | getCountOfMogisByFormat')
    connection.end();
  }
}

