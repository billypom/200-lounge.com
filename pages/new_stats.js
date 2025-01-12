import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link';
import SeasonPreservingLink from '../components/SeasonPreservingLink';
// import mysql from 'mysql2'
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

const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), {
    ssr: false,
    loading: () => <p>Loading...</p>
});



export async function getServerSideProps(context) {
    const season = context.query.season || 7
    return {
        props: { season }
    }
}

export default function Stats({ season }) {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [offsetInHours, setOffsetInHours] = useState(0)
    const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState({})

    function formatHour(hour) {
        const period = hour < 12 ? 'AM' : 'PM';
        const formattedHour = hour % 12 || 12; // convert 0 to 12
        return `${formattedHour}${period}`;
    }

    // Resize listener for mobile
    useEffect(() => {
        function handleResize() {
            setWidth(typeof window === 'undefined' ? 0 : window.innerWidth)
            setIsMobile(width > 1000 ? false : true)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    },)

    // Need date conversion in useEffect for hydration purposes
    useEffect(() => {
        setOffsetInHours(new Date().getTimezoneOffset() / 60)
    }, [])

    // Rank & rank colors
    var colors = []
    const rank_names = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster']
    if (prefersDarkMode) {
        // Master purple
        colors = ['#817876', '#E67E22', '#7D8396', '#F1C40F', '#3FABB8', '#9CCBD6', '#8b5cf6', '#A3022C']
    } else {
        // Master black
        colors = ['#817876', '#E67E22', '#7D8396', '#F1C40F', '#3FABB8', '#9CCBD6', '#0E0B0B', '#A3022C']
    }


    // api fetch data

    // let today_top_score = null
    // let today_mogi_count = null
    // let rank_count_by_player = null
    // let total_registered_players = null
    // let total_ranked_players = null
    // let total_mogis_played = null
    // let average_mmr = null
    // let median_mmr = null
    // let mogi_format_count = null
    // let mogi_day_of_week_data = null
    // let mogi_count_by_tier = null
    // let mogis_per_rank = null
    // let all_time_top_score = null
    // let avg_mogis_per_day = null
    // let season_length_in_days = null
    const mogi_colors = ['#ffce47', '#76D7C4', '#85C1E9', '#C39BD3', '#F1948A'];
    const tier_colors = ['#9339bd', '#bd397b', '#39bd7d', '#39b6bd', '#bd7b39']
    let mappedRankData = {}
    let mogis_per_rank_data = {}
    let mogi_format_data = {}
    useEffect(() => {
        async function fetchData() {
            try {
                fetch(`/api/stats?season=${season}`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        setData(data)
                        setLoading(false)
                    }).then(() => {
                        // Map data to include a color property based on rank_name
                        mappedRankData = data.rank_count_by_player.map((item) => {
                            const index = rank_names.indexOf(item.rank_name);
                            console.log(item)
                            return {
                                ...item,
                                color: colors[index] || '#000000', // Default color if not found in array
                            };
                        });

                        // Mogi & mogi colors
                        // Mogi format - convert rows to a format suitable for the Pie Chart
                        mogi_format_data = data.mogi_format_count.map(row => ({
                            mogi_format: row.mogi_format,
                            mogi_count: row.mogi_count,
                            name: row.format_name, // Using the word "name" specifically with recharts will make that the legend?
                        }))

                        // Mogi day of week/hour data
                        mogi_frequency_data = data.mogi_day_of_week_data.map(row => ({
                            day_of_week: row.day_of_week,
                            hour_of_day: row.hour_of_day,
                            mogi_count: row.mogi_count
                        }))

                        daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                        adjustedMogiFrequencyData = mogi_frequency_data.map(dayData => {
                            const adjustedHour = (dayData.hour_of_day - offsetInHours + 24) % 24
                            return {
                                day_of_week: dayData.day_of_week,
                                hour: adjustedHour,
                                mogi_count: dayData.mogi_count
                            }
                        })
                        maxMogiFrequencyCount = Math.max(...adjustedMogiFrequencyData.map(data => data.mogi_count), 0)

                        // Mogi by tier data
                        mogi_tier_data = data.mogi_count_by_tier.map(row => ({
                            mogi_count: row.mogi_count,
                            name: row.tier_name, // Using the word "name" specifically with recharts will make that the legend?
                        }))

                        // Mogis by rank data
                        mogis_per_rank_data = data.mogis_per_rank.map(row => ({
                            name: row.rank_name,
                            mogi_count: row.mogis_played
                        }))

                    })
            } catch (error) {
                console.error('Error fetching stats', error)
            } finally {
                console.log('finally')
            }
        }
        fetchData()
    }, [])




    return (
        <div className={styles.container}>
            <Head>
                <title>200 Lounge | Stats</title>
                <meta name="description" content="MK8DX 200cc Lounge Stats" />
                <link rel="icon" href="/200.png" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Stats
                </h1>
                {isLoading ? <h2 className={`${styles.tier_title} z-10 dark:bg-zinc-800/75 bg-neutral-200/75`}>loading...</h2>
                    : <>

                        {/* Daily stats */}
                        <div className="flex flex-col text-center z-10 items-center">
                            <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>daily stats</h2>
                            <div className='flex flex-row flex-wrap w-full justify-center'>

                                {data.today_top_score[0] ?
                                    <div className={styles.player_page_stats}>
                                        <h2 className='text-md font-bold'>Today&apos;s Top Score:</h2>
                                        <div className='flex flex-row flex-wrap justify-center font-normal'>
                                            <div className="dark:text-cyan-600 text-blue-500 cursor-pointer hover:underline">
                                                <SeasonPreservingLink to={`/player/${data.today_top_score[0].player_name}`}>
                                                    {data.today_top_score[0].player_name}
                                                </SeasonPreservingLink>
                                            </div>
                                            <div className='px-2'>{' '}-{' '}</div>
                                            <div className="dark:text-cyan-600 text-blue-500 cursor-pointer hover:underline">
                                                <SeasonPreservingLink to={`/mogi/${data.today_top_score[0].mogi_id}`}>
                                                    {data.today_top_score[0].score}
                                                </SeasonPreservingLink>
                                            </div>
                                        </div>
                                    </div> : <></>}

                                {data.all_time_top_score[0] ?
                                    <div className={styles.player_page_stats}>
                                        <h2 className='text-md font-bold'>Season Top Score:</h2>
                                        <div className='flex flex-row flex-wrap justify-center font-normal'>
                                            <div className="dark:text-cyan-600 text-blue-500 cursor-pointer hover:underline">
                                                <SeasonPreservingLink to={`/player/${data.all_time_top_score[0].player_name}`}>
                                                    {data.all_time_top_score[0].player_name}
                                                </SeasonPreservingLink>
                                            </div>
                                            <div className='px-2'>{' '}-{' '}</div>
                                            <div className="dark:text-cyan-600 text-blue-500 cursor-pointer hover:underline">
                                                <SeasonPreservingLink to={`/mogi/${data.all_time_top_score[0].mogi_id}`}>
                                                    {data.all_time_top_score[0].score}
                                                </SeasonPreservingLink>
                                            </div>
                                        </div>
                                    </div> : <></>}

                                {data.today_mogi_count[0].count > 0 ?
                                    <div className={styles.player_page_stats}>
                                        <h2 className='text-md font-bold'>Mogis Today:</h2>
                                        <div>{data.today_mogi_count[0].count}</div>
                                    </div> : <></>}

                                {data.avg_mogis_per_day[0] ?
                                    <div className={styles.player_page_stats}>
                                        <h2 className='text-md font-bold'>Average Mogis Per Day:</h2>
                                        <div>{data.avg_mogis_per_day[0].avg_mogis_per_day}</div>
                                    </div> : <></>}

                                <div className={styles.player_page_stats}>
                                    <h2 className='text-md font-bold'>Total Mogis:</h2>
                                    <div>{data.total_mogis_played[0].count}</div>
                                </div>

                                {data.season_length_in_days[0] ?
                                    <div className={styles.player_page_stats}>
                                        <h2 className='text-md font-bold'>Season Length:</h2>
                                        <div>{data.season_length_in_days[0].season_length_in_days} days</div>
                                    </div> : <></>}
                            </div>


                            {/* Player stats */}
                            <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>player stats</h2>



                            {/* <div className={'mt-6 pb-10 bg-neutral-100 border-double border-4 border-black rounded-lg dark:border-gray-700 dark:bg-zinc-900'}> */}
                            {/*     <div className={styles.chart_title}> */}
                            {/*         <h2 className='text-xl font-bold'>Players by Rank</h2> */}
                            {/*     </div> */}
                            {/*     <BarChart */}
                            {/*         width={isMobile ? 375 : 750} height={isMobile ? 300 : 400} */}
                            {/*         data={mappedRankData} */}
                            {/*         margin={{ top: 5, right: 30, left: 20, bottom: 48 }} */}
                            {/*     > */}
                            {/*         <CartesianGrid strokeDasharray="3 3" /> */}
                            {/*         <XAxis dataKey="rank_name" angle={-45} textAnchor="end" verticalAnchor="middle" /> */}
                            {/*         <YAxis /> */}
                            {/*         <Tooltip /> */}
                            {/*         <Legend /> */}
                            {/*         <Bar dataKey="player_count" fill="#8884d8"> */}
                            {/*             { */}
                            {/*                 mappedRankData.map((entry, index) => ( */}
                            {/*                     <Cell key={`cell-${index}`} fill={entry.color} /> */}
                            {/*                 )) */}
                            {/*             } */}
                            {/*         </Bar> */}
                            {/*     </BarChart> */}
                            {/* </div> */}

                            <div className='flex flex-row flex-wrap justify-center'>
                                <div className={styles.player_page_stats}>
                                    <h2 className='text-xl font-bold'>Total Players:</h2>
                                    <div>{data.total_registered_players[0].count}</div>
                                </div>

                                <div className={styles.player_page_stats}>
                                    <h2 className='text-xl font-bold'>Ranked Players:</h2>
                                    <div>{data.total_ranked_players[0].count}</div>
                                </div>

                                {data.average_mmr ?
                                    <div className={styles.player_page_stats}>
                                        <h2 className='text-xl font-bold'>Average Mmr:</h2>
                                        <div className={data.average_mmr[0].average >= 11000 ? 'text-red-800' : data.average_mmr[0].average >= 9000 ? 'text-violet-700' : data.average_mmr[0].average >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : data.average_mmr[0].average >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : data.average_mmr[0].average >= 4500 ? 'text-yellow-500' : data.average_mmr[0].average >= 3000 ? 'text-gray-400' : data.average_mmr[0].average >= 1500 ? 'text-orange-400' : 'text-stone-500'}>{data.average_mmr[0].average}</div>
                                    </div>
                                    : <></>}

                                {data.median_mmr ?
                                    <div className={styles.player_page_stats}>
                                        <h2 className='text-xl font-bold'>Median Mmr:</h2>
                                        <div className={data.median_mmr[0].median >= 11000 ? 'text-red-800' : data.median_mmr[0].median >= 9000 ? 'text-violet-700' : data.median_mmr[0].median >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : data.median_mmr[0].median >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : data.median_mmr[0].median >= 4500 ? 'text-yellow-500' : data.median_mmr[0].median >= 3000 ? 'text-gray-400' : data.median_mmr[0].median >= 1500 ? 'text-orange-400' : 'text-stone-500'}>{data.median_mmr[0].median}</div>
                                    </div>
                                    : <></>}
                            </div>

                            {/* Mogi stats */}
                            <h2 className={`${styles.tier_title} dark:bg-zinc-800/75 bg-neutral-200/75`}>mogi stats</h2>




                            <div className={'mt-6 pb-10 bg-neutral-100 border-double border-4 border-black rounded-lg dark:border-gray-700 dark:bg-zinc-900'}>
                                <div className={styles.chart_title}>
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



                            <div className={'mt-6 pb-10 bg-neutral-100 border-double border-4 border-black rounded-lg dark:border-gray-700 dark:bg-zinc-900'}>
                                <div className={styles.chart_title}>
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
                                    <Legend />
                                    <Bar dataKey="mogi_count" fill="#8884d8">
                                        {
                                            mogi_tier_data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={tier_colors[index % tier_colors.length]} />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
                            </div>


                            <div className={'mt-6 pb-10 bg-neutral-100 border-double border-4 border-black rounded-lg dark:border-gray-700 dark:bg-zinc-900'}>
                                <div className={styles.chart_title}>
                                    <h2 className='text-xl font-bold'>Mogis by Rank</h2>
                                </div>
                                <BarChart
                                    width={isMobile ? 375 : 750} height={isMobile ? 300 : 400}
                                    data={data.mogis_per_rank_data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 52 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" verticalAnchor="middle" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="mogi_count" fill="#8884d8">
                                        {
                                            data.mogis_per_rank_data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                            ))
                                        }
                                    </Bar>
                                </BarChart>
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
                                    const dataForDay = adjustedMogiFrequencyData.filter(data => data.day_of_week === day)

                                    return (
                                        <div key={day} className={'pb-6 m-4 border-double border-4 border-black dark:border-gray-700 bg-neutral-100 dark:bg-zinc-900'}>
                                            <div className={styles.chart_title}>
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
                                                <YAxis dataKey="mogi_count" name='Count' domain={[0, maxMogiFrequencyCount]} />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="mogi_count" stroke="#8884d8" fill="#8884d8" />
                                            </AreaChart>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </>}
            </main>
        </div>
    );
}
