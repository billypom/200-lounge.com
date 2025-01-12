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
  const mogi_colors = ['#ffce47', '#76D7C4', '#85C1E9', '#C39BD3', '#F1948A'];
  const rank_names = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster']
  const rank_colors = ['#817876', '#E67E22', '#7D8396', '#F1C40F', '#3FABB8', '#9CCBD6', '#8b5cf6', '#A3022C']

  // if (prefersDarkMode) {
  //   // Master purple
  //   rank_colors = ['#817876', '#E67E22', '#7D8396', '#F1C40F', '#3FABB8', '#9CCBD6', '#8b5cf6', '#A3022C']
  // } else {
  //   // Master black
  //   rank_colors = ['#817876', '#E67E22', '#7D8396', '#F1C40F', '#3FABB8', '#9CCBD6', '#0E0B0B', '#A3022C']
  // }

  try {
    connection.connect();

    // Count of players in each rank
    let stuff3 = await new Promise((resolve, reject) => {
      connection.query('SELECT r.rank_name, COUNT(p.player_id) as player_count FROM player p JOIN ranks r ON p.mmr BETWEEN r.mmr_min AND r.mmr_max GROUP BY r.rank_name, r.mmr_min ORDER BY r.mmr_min;', [], (error, stuff3) => {
        if (error) reject(error)
        else resolve(stuff3)
      })
    })
    let rank_count_by_player = JSON.parse(JSON.stringify(stuff3))

    // Map data to include a color property based on rank_name
    rank_count_by_player = rank_count_by_player.map((item) => {
      const index = rank_names.indexOf(item.rank_name);
      console.log(item)
      return {
        ...item,
        color: rank_colors[index] || '#000000', // Default color if not found in array
      };
    });


    res.status(200).json({ rank_count_by_player });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('API Success | getCountOfPlayersInEachRank')
    connection.end();
  }
}

