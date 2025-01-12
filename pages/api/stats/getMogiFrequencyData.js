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

    // Mogi day frequency data
    let stuff10 = await new Promise((resolve, reject) => {
      connection.query("SELECT DAYNAME(create_date) as day_of_week, HOUR(create_date) as hour_of_day, COUNT(mogi_id) as mogi_count FROM mogi GROUP BY day_of_week, hour_of_day ORDER BY FIELD(day_of_week, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'), hour_of_day;", [], (error, stuff10) => {
        if (error) reject(error)
        else resolve(stuff10)
      })
    })
    const data = JSON.parse(JSON.stringify(stuff10))


    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('API Success | getMogiFrequencyData')
    connection.end();
  }
}

