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

    // Tier usages
    let stuff = await new Promise((resolve, reject) => {
      connection.query("select t.tier_name, count(mogi_id) as mogi_count from mogi m join tier t on m.tier_id = t.tier_id group by t.tier_id;", [], (error, stuff) => {
        if (error) reject(error)
        else resolve(stuff)
      })
    })
    const data = JSON.parse(JSON.stringify(stuff))


    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('API Success | getCountOfMogisByTier')
    connection.end();
  }
}

