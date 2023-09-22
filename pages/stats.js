import Head from 'next/head'
import Link from 'next/link';
import mysql from 'mysql2'
import styles from '../styles/Home.module.css'
import { useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react'
import { Area, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

// Dynamic ssr for chart hydration
import dynamic from "next/dynamic"
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), {
    ssr: false,
    loading: () => <p>Loading...</p>
});

const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), {
    ssr: false,
    loading: () => <p>Loading...</p>
});

const AreaChart = dynamic(() => import('recharts').then(mod => mod.ScatterChart), {
    ssr: false,
    loading: () => <p>Loading...</p>
});




export async function getServerSideProps(context) {
    console.log(context.query)
    const season = context.query.season || 6
    const db_choice = `s${season}200lounge`
    const connection = mysql.createConnection(
      {
        host: process.env.db_host,
        user: process.env.db_username,
        password: process.env.db_password,
        database: db_choice,
        insecureAuth: true,
        supportBigNumbers: true,
      }
    )
    connection.connect();
    // today's top score
    let stuff = await new Promise((resolve, reject) => {
        connection.query(
            `SELECT p.player_name, m.mogi_id, pm.score, m.create_date
      FROM player_mogi pm
      JOIN mogi m
      ON m.mogi_id = pm.mogi_id
      JOIN player p
      ON p.player_id = pm.player_id
      WHERE m.create_date >= curdate()
      ORDER BY score DESC, create_date DESC
      limit 1;`, [], (error, stuff) => {
            if (error) reject(error)
            else resolve(stuff)
        })
    })
    const today_top_score = JSON.parse(JSON.stringify(stuff).replace(/\:null/gi, "\:\"\""))

    // # of mogis today
    let stuff2 = await new Promise((resolve, reject) => {
        connection.query(
            `select count(*) as "count" from mogi where create_date >= curdate();`, [], (error, stuff2) => {
                if (error) reject(error)
                else resolve(stuff2)
            }
        )
    })
    const today_mogi_count = JSON.parse(JSON.stringify(stuff2).replace(/\:null/gi, "\:\"\""))

    // Count of players in each rank
    let stuff3 = await new Promise((resolve, reject) => {
        connection.query('SELECT r.rank_name, COUNT(p.player_id) as player_count FROM player p JOIN ranks r ON p.mmr BETWEEN r.mmr_min AND r.mmr_max GROUP BY r.rank_name, r.mmr_min ORDER BY r.mmr_min;', [], (error, stuff3) => {
            if (error) reject(error)
            else resolve(stuff3)
        })
    })
    const rank_count_by_player = JSON.parse(JSON.stringify(stuff3))

    // Count of all players
    let stuff4 = await new Promise((resolve, reject) => {
        connection.query('SELECT count(*) as count FROM player;', [], (error, stuff4) => {
            if (error) reject(error)
            else resolve(stuff4)
        })
    })
    const total_registered_players = JSON.parse(JSON.stringify(stuff4))

    // Count of all players who have MMR
    let stuff5 = await new Promise((resolve, reject) => {
        connection.query('SELECT count(*) as count FROM player WHERE mmr IS NOT NULL;', [], (error, stuff5) => {
            if (error) reject(error)
            else resolve(stuff5)
        })
    })
    const total_ranked_players = JSON.parse(JSON.stringify(stuff5))

    // Count of all mogis
    let stuff6 = await new Promise((resolve, reject) => {
        connection.query('SELECT count(*) as count FROM mogi;', [], (error, stuff6) => {
            if (error) reject(error)
            else resolve(stuff6)
        })
    })
    const total_mogis_played = JSON.parse(JSON.stringify(stuff6))

    // Average MMR
    let stuff7 = await new Promise((resolve, reject) => {
        connection.query('SELECT round(avg(mmr),0) as average from player;', [], (error, stuff7) => {
            if (error) reject(error)
            else resolve(stuff7)
        })
    })
    const average_mmr = JSON.parse(JSON.stringify(stuff7))

    // Median MMR
    let stuff8 = await new Promise((resolve, reject) => {
        connection.query('SELECT ROUND(AVG(sub.mmr),0) AS median FROM (SELECT s.mmr, COUNT(*) AS count_all, SUM(CASE WHEN s2.mmr <= s.mmr THEN 1 ELSE 0 END) AS my_rank FROM player s JOIN player s2 ON 1=1 GROUP BY s.mmr HAVING my_rank - 1 <= count_all / 2 AND my_rank + 1 >= count_all / 2 ORDER BY s.mmr) sub;', [], (error, stuff8) => {
            if (error) reject(error)
            else resolve(stuff8)
        })
    })
    const median_mmr = JSON.parse(JSON.stringify(stuff8))


    // Mogi format count
    let stuff9 = await new Promise((resolve, reject) => {
        connection.query("SELECT mogi_format, COUNT(mogi_id) as mogi_count, CASE mogi_format WHEN 1 THEN 'FFA' WHEN 2 THEN '2v2' WHEN 3 THEN '3v3' WHEN 4 THEN '4v4' WHEN 6 THEN '6v6' END AS format_name FROM mogi m join tier t on m.tier_id = t.tier_id GROUP BY mogi_format order by mogi_format asc;", [], (error, stuff9) => {
            if (error) reject(error)
            else resolve(stuff9)
        })
    })
    const mogi_format_count = JSON.parse(JSON.stringify(stuff9))

    // Mogi day frequency data
    let stuff10 = await new Promise((resolve, reject) => {
        connection.query("SELECT DAYNAME(create_date) as day_of_week, HOUR(create_date) as hour_of_day, COUNT(mogi_id) as mogi_count FROM mogi GROUP BY day_of_week, hour_of_day ORDER BY FIELD(day_of_week, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'), hour_of_day;", [], (error, stuff10) => {
            if (error) reject(error)
            else resolve(stuff10)
        })
    })
    const mogi_day_of_week_data = JSON.parse(JSON.stringify(stuff10))

    // Tier usages
    let stuff11 = await new Promise((resolve, reject) => {
        connection.query("select t.tier_name, count(mogi_id) as mogi_count from mogi m join tier t on m.tier_id = t.tier_id group by t.tier_id;", [], (error, stuff11) => {
            if (error) reject(error)
            else resolve(stuff11)
        })
    })
    const mogi_count_by_tier = JSON.parse(JSON.stringify(stuff11))

    // mogis per rank
    let stuff12 = await new Promise((resolve, reject) => {
        connection.query("SELECT r.rank_name, COUNT(DISTINCT pm.mogi_id) as mogis_played FROM player_mogi pm INNER JOIN ranks r ON pm.prev_mmr BETWEEN r.mmr_min AND r.mmr_max GROUP BY r.rank_name ORDER BY mogis_played DESC;", [], (error, stuff12) => {
            if (error) reject(error)
            else resolve(stuff12)
        })
    })
    const mogis_per_rank = JSON.parse(JSON.stringify(stuff12))



    

    

    connection.end();

    return {
        props: { today_top_score, today_mogi_count, rank_count_by_player, total_registered_players, total_ranked_players, total_mogis_played, average_mmr, median_mmr, mogi_format_count, mogi_day_of_week_data, mogi_count_by_tier, mogis_per_rank }
    }
}







export default function Stats({ today_top_score, today_mogi_count, rank_count_by_player, total_registered_players, total_ranked_players, total_mogis_played, average_mmr, median_mmr, mogi_format_count, mogi_day_of_week_data, mogi_count_by_tier, mogis_per_rank }) {
    
    // Turns a 24 hour number into an AM PM time
    function formatHour(hour) {
        const period = hour < 12 ? 'AM' : 'PM';
        const formattedHour = hour % 12 || 12; // convert 0 to 12
        return `${formattedHour}${period}`;
    }

    // Mobile handling things
    const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        function handleResize() {
            setWidth(typeof window === 'undefined' ? 0 : window.innerWidth)
            setIsMobile(width > 1000 ? false : true)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    },)

    // Rank & rank colors
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    var colors = []
    const rank_names = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster']
    if (prefersDarkMode) {
        // Master purple
        colors = ['#817876', '#E67E22', '#7D8396', '#F1C40F', '#3FABB8', '#9CCBD6', '#8b5cf6', '#A3022C']    
    } else {
        // Master black
        colors = ['#817876', '#E67E22', '#7D8396', '#F1C40F', '#3FABB8', '#9CCBD6', '#0E0B0B', '#A3022C']
    }

    // Map data to include a color property based on rank_name
    const mappedRankData = rank_count_by_player.map((item) => {
        const index = rank_names.indexOf(item.rank_name);
        return {
            ...item,
            color: colors[index] || '#000000', // Default color if not found in array
        };
    });

    // Mogi & mogi colors
    const mogi_colors = ['#ffce47', '#76D7C4', '#85C1E9', '#C39BD3', '#F1948A'];
    // Mogi format - convert your rows to a format suitable for the Pie Chart
    const mogi_format_data = mogi_format_count.map(row => ({
        mogi_format: row.mogi_format,
        mogi_count: row.mogi_count,
        name: row.format_name, // Using the word "name" specifically with recharts will make that the legend?
    }))

    // Mogi day of week/hour data
    const mogi_frequency_data = mogi_day_of_week_data.map(row => ({
        day_of_week: row.day_of_week,
        hour_of_day: row.hour_of_day,
        mogi_count: row.mogi_count
    }))

    // Need date conversion in useEffect for hydration purposes
    const [offsetInHours, setOffsetInHours] = useState(0);
    useEffect(() => {
        setOffsetInHours(new Date().getTimezoneOffset() / 60);
    }, []);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const adjustedMogiFrequencyData = mogi_frequency_data.map(dayData => {
        const adjustedHour = (dayData.hour_of_day - offsetInHours + 24) % 24;
        return {
            day_of_week: dayData.day_of_week,
            hour: adjustedHour,
            mogi_count: dayData.mogi_count
        };
    });
    const maxMogiFrequencyCount = Math.max(...adjustedMogiFrequencyData.map(data => data.mogi_count), 0);

    // Mogi by tier data
    const tier_colors = ['#9339bd', '#bd397b', '#39bd7d', '#39b6bd', '#bd7b39']
    const mogi_tier_data = mogi_count_by_tier.map(row => ({
        mogi_count: row.mogi_count,
        name: row.tier_name, // Using the word "name" specifically with recharts will make that the legend?
    }))

    // Mogis by rank data
    const mogis_per_rank_data = mogis_per_rank.map(row => ({
        name: row.rank_name,
        mogi_count: row.mogis_played
    }))


























    return (
        <div className={styles.container}>
            <Head>
                <title>200 Lounge | Stats</title>
                <meta name="description" content="MK8DX 200cc Lounge Stats" />
                <link rel="icon" href="/200.png" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    stats
                </h1>


                {/* Daily stats */}
                <div className="flex flex-col text-center z-10 items-center">
                    <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>daily stats</h2>
                    <div className='flex flex-row flex-wrap w-full justify-center'>
                        {today_top_score[0] ?
                            <div className={styles.player_page_stats}>
                                <h2 className='text-md font-bold'>Today&apos;s Top Score:</h2>
                                <div className='flex flex-row flex-wrap justify-center font-normal'>
                                    <div className="dark:text-cyan-300 text-blue-500 cursor-pointer hover:underline">
                                        <Link href={`/player/${today_top_score[0].player_name}`}>{today_top_score[0].player_name}</Link>
                                    </div>
                                    <div className='px-2'>{' '}-{' '}</div>
                                    <div className="dark:text-cyan-300 text-blue-500 cursor-pointer hover:underline">
                                        <Link href={`/mogi/${today_top_score[0].mogi_id}`}>{today_top_score[0].score}</Link>
                                    </div>
                                </div>
                            </div> : <></>}

                        {today_mogi_count[0] ?
                            <div className={styles.player_page_stats}>
                                <h2 className='text-xl font-bold'>Mogis Today:</h2>
                                <div>{today_mogi_count[0].count}</div>
                            </div> : <></>}
                    </div>


                    {/* Player stats */}
                    <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>player stats</h2>



                    <div className={ 'pb-2'}>
                        <div className={styles.player_page_stats}>
                            <h2 className='text-xl font-bold'>Players by Rank</h2>
                        </div>
                        <BarChart
                            width={isMobile ? 375 : 750} height={isMobile ? 300 : 400}
                            data={mappedRankData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 48 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="rank_name" angle={-45} textAnchor="end" verticalAnchor="middle" />
                            <YAxis />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Bar dataKey="player_count" fill="#8884d8">
                                {
                                    mappedRankData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    </div>

                    <div className='flex flex-row flex-wrap justify-center'>
                        <div className={styles.player_page_stats}>
                            <h2 className='text-xl font-bold'>Total Players:</h2>
                            <div>{total_registered_players[0].count}</div>
                        </div>

                        <div className={styles.player_page_stats}>
                            <h2 className='text-xl font-bold'>Ranked Players:</h2>
                            <div>{total_ranked_players[0].count}</div>
                        </div>

                        {average_mmr ?
                            <div className={styles.player_page_stats}>
                                <h2 className='text-xl font-bold'>Average Mmr:</h2>
                                <div className={average_mmr[0].average >= 11000 ? 'text-red-800' : average_mmr[0].average >= 9000 ? 'text-violet-700' : average_mmr[0].average >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : average_mmr[0].average >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : average_mmr[0].average >= 4500 ? 'text-yellow-500' : average_mmr[0].average >= 3000 ? 'text-gray-400' : average_mmr[0].average >= 1500 ? 'text-orange-400' : 'text-stone-500'}>{average_mmr[0].average}</div>
                            </div>
                            : <></>}

                        {median_mmr ?
                            <div className={styles.player_page_stats}>
                                <h2 className='text-xl font-bold'>Median Mmr:</h2>
                                <div className={median_mmr[0].median >= 11000 ? 'text-red-800' : median_mmr[0].median >= 9000 ? 'text-violet-700' : median_mmr[0].median >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : median_mmr[0].median >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : median_mmr[0].median >= 4500 ? 'text-yellow-500' : median_mmr[0].median >= 3000 ? 'text-gray-400' : median_mmr[0].median >= 1500 ? 'text-orange-400' : 'text-stone-500'}>{median_mmr[0].median}</div>
                            </div>
                            : <></>}
                    </div>

                    {/* Mogi stats */}
                    <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>mogi stats</h2>

                    


                    <div className={'pb-2'}>
                        <div className={`${styles.player_page_stats}`}>
                            <h2 className='text-xl font-bold'>Mogis by Format</h2>
                        </div>
                        <PieChart width={isMobile ? 376 : 500} height={isMobile ? 376 : 500}>
                            <Pie
                                dataKey="mogi_count"
                                isAnimationActive={false}
                                data={mogi_format_data}
                                cx={isMobile ? 376 / 2 : 250}
                                cy={isMobile ? 376 / 2 : 250}
                                outerRadius={isMobile ? 120 : 160}
                                fill="#8884d8"
                                label
                            >
                                {mogi_format_data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={mogi_colors[index % mogi_colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>



                    <div className={'mt-6'}>
                        <div className={styles.player_page_stats}>
                            <h2 className='text-xl font-bold'>Mogis by Tier</h2>
                        </div>
                        <BarChart
                            width={isMobile ? 375 : 750} height={isMobile ? 300 : 400}
                            data={mogi_tier_data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 48 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" verticalAnchor="middle" />
                            <YAxis />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Bar dataKey="mogi_count" fill="#8884d8">
                                {
                                    mogi_tier_data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={tier_colors[index % tier_colors.length]} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    </div>


                    <div className={'mt-6'}>
                        <div className={styles.player_page_stats}>
                            <h2 className='text-xl font-bold'>Mogis by Rank</h2>
                        </div>
                        <BarChart
                            width={isMobile ? 375 : 750} height={isMobile ? 300 : 400}
                            data={mogis_per_rank_data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 48 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" verticalAnchor="middle" />
                            <YAxis />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Bar dataKey="mogi_count" fill="#8884d8">
                                {
                                    mogis_per_rank_data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    </div>





                    <div className='flex flex-row flex-wrap justify-center'>
                        <div className={styles.player_page_stats}>
                            <h2 className='text-xl font-bold'>Total Mogis:</h2>
                            <div>{total_mogis_played[0].count}</div>
                        </div>

                        
                    </div>

                    

                    {/* Activity stats */}
                    <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>activity stats</h2>
                    <div className={styles.player_page_stats}>
                        <h2 className='text-xl font-bold'>Mogi Gathering Frequency</h2>
                        <p className='text-gray-400'>(total count by weekday & hour)</p>
                    </div>

                    <div className='flex flex-row flex-wrap justify-center'>
                        {daysOfWeek.map(day => {
                            // Filter data for each day
                            const dataForDay = adjustedMogiFrequencyData.filter(data => data.day_of_week === day);

                            return (
                                <div key={day} className={ isMobile ? 'pb-6 m-4' : 'pb-6 m-4 border border-gray-100 dark:border-gray-700'}>
                                    <div className={styles.player_page_stats}>
                                        <h2 className='text-2xl font-bold'>{day}</h2>
                                    </div>
                                    <AreaChart
                                        width={400}
                                        height={300}
                                        data={dataForDay}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid />
                                        <XAxis dataKey="hour" name='Hour' unit='' tickFormatter={formatHour} />
                                        <YAxis dataKey="mogi_count" name='Count' domain={[0, maxMogiFrequencyCount]}/>
                                        <Tooltip />
                                        <Area type="monotone" dataKey="mogi_count" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </div>
                            );
                        })}
                    </div>


                </div>
            </main>
        </div>
    );
}