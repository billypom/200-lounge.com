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

    // Average MMR
    let stuff = await new Promise((resolve, reject) => {
      connection.query('SELECT round(avg(mmr),0) as average from player;', [], (error, stuff) => {
        if (error) reject(error)
        else resolve(stuff)
      })
    })
    const average_mmr = JSON.parse(JSON.stringify(stuff))


    res.status(200).json({ average_mmr });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('API Success | getAverageMMR')
    connection.end();
  }
}

