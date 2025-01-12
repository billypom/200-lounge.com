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

  try {
    connection.connect();



    // average mogis per day
    let stuff14 = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT ROUND(AVG(mogis_per_day),0) AS avg_mogis_per_day FROM (SELECT DATE(create_date) as day_created, COUNT(*) as mogis_per_day FROM mogi GROUP BY DATE(create_date)) as daily_mogis;`, [], (error, stuff14) => {
          if (error) reject(error)
          else resolve(stuff14)
        })
    })
    const avg_mogis_per_day = JSON.parse(JSON.stringify(stuff14))

    // length of season
    let stuff15 = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT DATEDIFF(MAX(DATE(create_date)), MIN(DATE(create_date)))as season_length_in_days FROM mogi;`, [], (error, stuff15) => {
          if (error) reject(error)
          else resolve(stuff15)
        })
    })
    const season_length_in_days = JSON.parse(JSON.stringify(stuff15))

    // Map data to include a color property based on rank_name
    let mappedRankData = data.rank_count_by_player.map((item) => {
      const index = rank_names.indexOf(item.rank_name);
      console.log(item)
      return {
        ...item,
        color: colors[index] || '#000000', // Default color if not found in array
      };
    });

    // Mogi & mogi colors
    // Mogi format - convert rows to a format suitable for the Pie Chart
    let mogi_format_data = data.mogi_format_count.map(row => ({
      mogi_format: row.mogi_format,
      mogi_count: row.mogi_count,
      name: row.format_name, // Using the word "name" specifically with recharts will make that the legend?
    }))

    // Mogi day of week/hour data
    let mogi_frequency_data = data.mogi_day_of_week_data.map(row => ({
      day_of_week: row.day_of_week,
      hour_of_day: row.hour_of_day,
      mogi_count: row.mogi_count
    }))

    let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let adjustedMogiFrequencyData = mogi_frequency_data.map(dayData => {
      const adjustedHour = (dayData.hour_of_day - offsetInHours + 24) % 24
      return {
        day_of_week: dayData.day_of_week,
        hour: adjustedHour,
        mogi_count: dayData.mogi_count
      }
    })
    let maxMogiFrequencyCount = Math.max(...adjustedMogiFrequencyData.map(data => data.mogi_count), 0)

    // Mogi by tier data
    let mogi_tier_data = data.mogi_count_by_tier.map(row => ({
      mogi_count: row.mogi_count,
      name: row.tier_name, // Using the word "name" specifically with recharts will make that the legend?
    }))

    // Mogis by rank data
    let mogis_per_rank_data = data.mogis_per_rank.map(row => ({
      name: row.rank_name,
      mogi_count: row.mogis_played
    }))

    res.status(200).json({ today_top_score, today_mogi_count, rank_count_by_player, total_registered_players, total_ranked_players, total_mogis_played, average_mmr, median_mmr, mogi_format_count, mogi_day_of_week_data, mogi_count_by_tier, mogis_per_rank, all_time_top_score, avg_mogis_per_day, season_length_in_days });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('api/stats completed')
    connection.end();
  }
}

