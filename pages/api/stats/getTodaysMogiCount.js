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
    let stuff = await new Promise((resolve, reject) => {
      connection.query(
        `select count(*) as "count" from mogi where create_date >= curdate();`, [], (error, stuff) => {
          if (error) reject(error)
          else resolve(stuff)
        }
      )
    })
    const data = JSON.parse(JSON.stringify(stuff).replace(/\:null/gi, "\:\"\""))[0]


    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('API Success | getTodaysMogiCount')
    connection.end();
  }
}

