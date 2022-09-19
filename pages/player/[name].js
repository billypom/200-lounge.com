import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ReactCountryFlag from "react-country-flag"
import Head from 'next/head'
import mysql from 'mysql2'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1d185f',
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    fontWeight: 750,
    color: theme.palette.text.primary
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.paper
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.text.divider
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));











// Create MySQL connection - Populate Q&A
export async function getServerSideProps(context) {
  // console.log(context)
  const { params } = context
  const player = params.name
  const connection = mysql.createConnection(
    {
      host: process.env.db_host,
      user: process.env.db_username,
      password: process.env.db_password,
      database: process.env.db_database,
      insecureAuth: true,
      supportBigNumbers: true,
    }
  )
  // Connect to server
  connection.connect();
  // Store table results
  let results = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT p.player_id, 
      p.country_code as "Country", 
      p.player_name as "Player Name", 
      p.mmr as "MMR", 
      p.peak_mmr as "Peak MMR", 
        ROUND((wintable.wins/pm.events_played)*100,2) as "Win Rate",
      CONCAT(tenpm.wins, "-", tenpm.losses) as "Win/Loss (Last 10)",
      tenpm.last_ten_change as "Gain/Loss (Last 10)",
      pm.events_played as "Events Played",
      pm.largest_gain as "Largest Gain",
      pm.largest_loss as "Largest Loss",
      r.rank_name
      FROM player as p 
      JOIN ranks as r ON r.rank_id = p.rank_id 
      JOIN (SELECT ten.player_id, SUM(CASE WHEN ten.mmr_change > 0 THEN 1 ELSE 0 END) as wins, SUM(CASE WHEN ten.mmr_change <= 0 THEN 1 ELSE 0 END) as losses, SUM(mmr_change) as last_ten_change
        FROM (SELECT player_id, mmr_change FROM (SELECT mogi_id FROM mogi ORDER BY create_date DESC) as m JOIN player_mogi ON m.mogi_id = player_mogi.mogi_id) as ten
        GROUP BY player_id) as tenpm
      ON p.player_id = tenpm.player_id
      JOIN (SELECT player_id, count(*) as events_played, MAX(mmr_change) as largest_gain, MIN(mmr_change) as largest_loss FROM player_mogi GROUP BY player_id) as pm
      ON p.player_id = pm.player_id
        JOIN (SELECT player_id, sum(if(mmr_change>0,1,0)) as wins FROM player_mogi GROUP BY player_id) as wintable
      ON wintable.player_id = p.player_id
      WHERE p.player_name= ?`, [player], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      }
    );
  }
  );
  results = JSON.parse(JSON.stringify(results))

  // mogi history
  let rows = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT pm.mogi_id, pm.mmr_change, pm.new_mmr, CONCAT(if(t.tier_name="sq","Squad Queue",CONCAT("Tier-",t.tier_name))," ", if(m.mogi_format=1,"FFA",CONCAT(m.mogi_format,"v",m.mogi_format))) as title, UNIX_TIMESTAMP(m.create_date) as create_date
      FROM player_mogi pm 
      JOIN mogi m ON pm.mogi_id = m.mogi_id 
      JOIN tier t on m.tier_id = t.tier_id
      WHERE pm.player_id = ?
      ORDER BY m.create_date DESC`, [results[0].player_id], (error, rows) => {
        if (error) reject(error);
        else resolve(rows);
      }
    );
  });
  rows = JSON.parse(JSON.stringify(rows))

  // largest gain
  let lg = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT mogi_id FROM player_mogi WHERE player_id = ? AND mmr_change = ?`, [results[0].player_id, results[0]["Largest Gain"]], (error, lg) => {
        if (error) reject(error);
        else resolve(lg);
      }
    );
  });
  lg = JSON.parse(JSON.stringify(lg))

  // largest loss
  let ll = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT mogi_id FROM player_mogi WHERE player_id = ? AND mmr_change = ?`, [results[0].player_id, results[0]["Largest Loss"]], (error, ll) => {
        if (error) reject(error);
        else resolve(ll);
      }
    );
  });
  ll = JSON.parse(JSON.stringify(ll))

  // partner avg
  let pa = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT ROUND(AVG(score),2) as pa FROM (SELECT player_id, mogi_id, place, score FROM player_mogi WHERE player_id <> ? AND (mogi_id, place) IN (SELECT mogi_id, place FROM player_mogi WHERE player_id = ?)) as table2;`, [results[0].player_id, results[0].player_id], (error, pa) => {
        if (error) reject(error);
        else resolve(pa);
      }
    );
  });
  pa = JSON.parse(JSON.stringify(pa))

  // partner avg
  let rank = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(player_id) as "Rank" FROM player WHERE mmr >= ?`, [results[0]["MMR"]], (error, rank) => {
        if (error) reject(error);
        else resolve(rank);
      }
    );
  });
  rank = JSON.parse(JSON.stringify(rank))

  // score stuff
  let score_stuff = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT MAX(score) as "Top Score", ROUND(AVG(score),2) as "Avg Score" FROM player_mogi WHERE player_id = ?`, [results[0].player_id], (error, score_stuff) => {
        if (error) reject(error);
        else resolve(score_stuff);
      }
    );
  });
  score_stuff = JSON.parse(JSON.stringify(score_stuff))

  

  // End connection to server
  connection.end();
  // return props as object ALWAYS
  return {
    props: { results, rows, lg, ll, pa, rank, score_stuff }
  }
}


export default function Player({ results, rows, lg, ll, pa, rank, score_stuff }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Player Details | 200 Lounge</title>
        <meta name="description" content="200 Lounge Player Profile" />
        <link rel="icon" href="/200.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
           <div className={results[0].rank_name === "Grandmaster" ? 'text-red-800' : results[0].rank_name === "Master" ? 'text-violet-700' : results[0].rank_name === "Diamond" ? 'text-cyan-200' : results[0].rank_name === "Platinum" ? 'text-cyan-600' : results[0].rank_name === "Gold" ? 'text-yellow-500' : results[0].rank_name === "Silver" ? 'text-gray-400' : results[0].rank_name === "Bronze" ? 'text-orange-400' : results[0].rank_name === "Iron" ? 'text-stone-500' : 'text-white'}><ReactCountryFlag countryCode={results[0]["Country"]} style={{width: '4rem', height: '4rem'}} svg /> {results[0]["Player Name"]} - {results[0].rank_name}</div>
          
        </h1>
        <div className='flex flex-row flex-wrap max-w-4xl m-auto justify-center'>
          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>Rank</h2>
            <div className='text-white'>{rank[0]["Rank"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>MMR</h2>
            <div className={results[0]["MMR"] >= 11000 ? 'text-red-800' : results[0]["MMR"] >= 9000 ? 'text-violet-700' : results[0]["MMR"] >= 7500 ? 'text-cyan-200' : results[0]["MMR"] >= 6000 ? 'text-cyan-600' : results[0]["MMR"] >= 4500 ? 'text-yellow-500' : results[0]["MMR"] >= 3000 ? 'text-gray-400' : results[0]["MMR"] >= 1500 ? 'text-orange-400' : 'text-stone-500'}>{results[0]["MMR"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>Peak MMR</h2>
            <div className={results[0]["Peak MMR"] >= 11000 ? 'text-red-800' : results[0]["Peak MMR"] >= 9000 ? 'text-violet-700' : results[0]["Peak MMR"] >= 7500 ? 'text-cyan-200' : results[0]["Peak MMR"] >= 6000 ? 'text-cyan-600' : results[0]["Peak MMR"] >= 4500 ? 'text-yellow-500' : results[0]["Peak MMR"] >= 3000 ? 'text-gray-400' : results[0]["Peak MMR"] >= 1500 ? 'text-orange-400' : 'text-stone-500'}>{results[0]["Peak MMR"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>Win Rate</h2>
            <div className='text-white'>{results[0]["Win Rate"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>Win/Loss (Last 10)</h2>
            <div className='text-white'>{results[0]["Win/Loss (Last 10)"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>+/- (Last 10)</h2>
            <div className='text-white'>{results[0]["Gain/Loss (Last 10)"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>Avg Score</h2>
            <div className='text-white'>{score_stuff[0]["Avg Score"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>Top Score</h2>
            <div className='text-white'>{score_stuff[0]["Top Score"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>Events Played</h2>
            <div className='text-white'>{results[0]["Events Played"]}</div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>Largest Gain</h2>
            <div className='cursor-pointer hover:underline text-cyan-300'><Link href={"/mogi/" + lg[0].mogi_id}>{results[0]["Largest Gain"]}</Link></div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>Largest Loss</h2>
            <div className='cursor-pointer hover:underline text-cyan-300'><Link href={"/mogi/" + ll[0].mogi_id}>{results[0]["Largest Loss"]}</Link></div>
          </div>

          <div className={styles.player_page_stats}>
            <h2 className='text-xl font-bold'>Partner Average</h2>
            <div className='text-white'>{pa[0]["pa"]}</div>
          </div>

        </div>
        <div className="m-auto p-1">
              <TableContainer component={Paper} className={styles.leaderboard_style}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        <div className={styles.leaderboard_text}>
                          event
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={styles.leaderboard_text}>
                          time
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={styles.leaderboard_text}>
                          +/-
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={styles.leaderboard_text}>
                          mmr
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage):rows).map((row) => (

                      <StyledTableRow key={row.mogi_id}>

                        <StyledTableCell align="center">
                          <Link href={"/mogi/" + row.mogi_id}>
                            <div className='cursor-pointer hover:underline text-cyan-300'>
                              {row.title}
                            </div>
                          </Link>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div className='text-white'>
                              {(new Date(row.create_date * 1000)).toLocaleString()}
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div className={row.mmr_change > 0 ? 'text-green-500': 'text-red-500'}>
                              {row.mmr_change}
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div className={row.new_mmr >= 11000 ? 'text-red-800' : row.new_mmr >= 9000 ? 'text-violet-700' : row.new_mmr >= 7500 ? 'text-cyan-200' : row.new_mmr >= 6000 ? 'text-cyan-600' : row.new_mmr >= 4500 ? 'text-yellow-500' : row.new_mmr >= 3000 ? 'text-gray-400' : row.new_mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                              {row.new_mmr}
                            </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                      <StyledTableRow>
                          <TablePagination
                          rowsPerPageOptions={[10, 25, {label: 'All', value: -1}]}
                          colSpan={rows[0].length}
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                              inputProps: {
                                  'aria-label': 'rows per page',
                              },
                              native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                          />
                      </StyledTableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </div>
      </main>
    </div>
  )
}
