import mysql from 'mysql2';

export const config = {
  api: {
    responseLimit: '512kb',
  },
}
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

    // today's top score
    let stuff = await new Promise((resolve, reject) => {
      connection.query(`SELECT p.player_name, m.mogi_id, pm.score, m.create_date FROM player_mogi pm JOIN mogi m ON m.mogi_id = pm.mogi_id JOIN player p ON p.player_id = pm.player_id WHERE m.create_date >= curdate() ORDER BY score DESC, create_date DESC limit 1;`, [], (error, stuff) => {
        if (error) reject(error)
        else resolve(stuff)
      })
    })
    const today_top_score = JSON.parse(JSON.stringify(stuff).replace(/\:null/gi, "\:\"\""))[0]


    res.status(200).json({ today_top_score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('API Success | getTodaysTopScore')
    connection.end();
  }
}

