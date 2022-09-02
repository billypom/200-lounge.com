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
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head'
import mysql from 'mysql2'
import styles from '../styles/Home.module.css'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import ReactCountryFlag from "react-country-flag"
import Link from 'next/link'




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











export async function getServerSideProps() {
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
  let rows = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT p.player_id, 
      RANK() OVER ( ORDER BY p.mmr DESC ) as "Rank",
      p.country_code as "Country", 
      p.player_name as "Player Name", 
      p.mmr as "MMR", 
      p.peak_mmr as "Peak MMR", 
      (wintable.wins/pm.events_played) as "Win Rate",
      CONCAT(tenpm.wins, "-", tenpm.losses) as "Win/Loss (Last 10)",
      tenpm.last_ten_change as "Gain/Loss (Last 10)",
      pm.events_played as "Events Played",
      pm.largest_gain as "Largest Gain",
      pm.largest_loss as "Largest Loss"
      FROM player as p 
      JOIN (SELECT ten.player_id, SUM(CASE WHEN ten.mmr_change > 0 THEN 1 ELSE 0 END) as wins, SUM(CASE WHEN ten.mmr_change <= 0 THEN 1 ELSE 0 END) as losses, SUM(mmr_change) as last_ten_change
        FROM (SELECT player_id, mmr_change FROM (SELECT mogi_id FROM mogi ORDER BY create_date DESC LIMIT 10) as m JOIN player_mogi ON m.mogi_id = player_mogi.mogi_id) as ten
        GROUP BY player_id) as tenpm
      ON p.player_id = tenpm.player_id
      JOIN (SELECT player_id, count(*) as events_played, MAX(mmr_change) as largest_gain, MIN(mmr_change) as largest_loss FROM player_mogi GROUP BY player_id) as pm
      ON p.player_id = pm.player_id
        JOIN (SELECT player_id, sum(if(mmr_change>0,1,0)) as wins FROM player_mogi GROUP BY player_id) as wintable
      ON wintable.player_id = p.player_id`, (error, rows) => {
        if (error) reject(error);
        else resolve(rows);
      }
    );
  }
  );
  // Parse mysql output into json table
  rows = JSON.parse(JSON.stringify(rows).replace(/\:null/gi, "\:\"\""))
  // return props as object ALWAYS
  if (rows.length === 0) {
    rows = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT
        0 as "Rank",
        0 as "Country", 
        0 as "Player Name", 
        0 as "MMR", 
        0 as "Peak MMR",
        0 as "Win Rate",
        0 as "Win/Loss (Last 10)",
        0 as "Gain/Loss (Last 10)",
        0 as "Events Played",
        0 as "Largest Gain",
        0 as "Largest Loss"`, (error, rows) => {
        if (error) reject(error)
        else resolve(rows)}
        );
      }
    )
  rows = JSON.parse(JSON.stringify(rows).replace(/\:null/gi, "\:\"\""))
  }
  // End connection to server
  connection.end();
  return {
    props: { rows }
  }
}




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



const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};





export default function Leaderboard({ rows }) {
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
  const columns = Object.keys(rows[0]);
  const [sortedBy, setSortedBy] = useState({
    column: columns[1],
    asc: false,
  });
  const [query, setQuery] = useState("")
  // bubble sort the data
  function sort(rows) {
    const { column, asc } = sortedBy;
    return rows.sort(function(a, b) {
      // I removed a[column].toString() in order to sort numbers properly.
      // There should be no type mismatches in my data... i think
      if (a[column] > b[column]) return asc ? -1 : 1
      if (b[column] > a[column]) return asc ? 1 : -1
      return 0;
    });
  }
  function filter(rows) {
    return rows.filter((row) => 
      columns.some(
        (column) => row[column] ? row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1 : "")
      );
  }


  // const [width, setWidth]   = useState(typeof window === 'undefined' ? 0 : window.innerWidth);
  // const [height, setHeight] = useState(typeof window === 'undefined' ? 0 : window.innerHeight);
  // const updateDimensions = () => {
  //     if (typeof window !== 'undefined') {
  //     setWidth(window.innerWidth);
  //     setHeight(window.innerHeight);
  //     }
  // }
  // useEffect(() => {
  //     window.addEventListener("resize", updateDimensions);
  //     return () => window.removeEventListener("resize", updateDimensions);
  // }, [updateDimensions]);



  const isMobile = useMediaQuery(768)


  return (
    <div className={styles.container}>
      <Head>
        <title>200 Lounge | Leaderboard</title>
        <meta name="description" content="MK8DX 200cc Lounge Leaderboard" />
        <link rel="icon" href="/200.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          200cc Lounge
        </h1>
        <h1 className={styles.title}>
          Leaderboard
        </h1>
        
        <div className="flex flex-col p-3 gap-2">
          <input 
            className="border border-gray-400 text-white placeholder:text-gray justify-start m-auto max-w-100 p-2" 
            type="text" 
            placeholder="(search)" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}/>
        </div>
        <div className="m-auto p-1">
              <TableContainer component={Paper} className={styles.leaderboard_style}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow >
                      {
                        columns.map((column, idx) => ( column === "player_id" ? <></> : isMobile && idx === 3 || idx > 4 ? <></> :
                          <StyledTableCell>
                            <div 
                              className={styles.leaderboard_text} 
                              onClick={() => 
                                setSortedBy((prev) => ({column: column, asc: !prev.asc}))}>
                                  <div>{column}</div>
                                  <div>{sortedBy.column === column &&
                                    (sortedBy.asc 
                                      ? <ChevronUpIcon className="w-5 h-5"/>
                                      :<ChevronDownIcon className="w-5 h-5"/>
                                    )}
                                </div>
                            </div>
                          </StyledTableCell>
                        ))
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? sort(filter(rows)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage):sort(filter(rows))).map((row, idx) => (
                        isMobile ? 
                          <StyledTableRow key={row.player_id}>
                            <StyledTableCell align="center text-primary">
                              <div className={row.MMR >= 11000 ? 'text-red-800' : row.MMR >= 9000 ? 'text-violet-700' : row.MMR >= 7500 ? 'text-cyan-200' : row.MMR >= 6000 ? 'text-cyan-600' : row.MMR >= 4500 ? 'text-yellow-500' : row.MMR >= 3000 ? 'text-gray-400' : row.MMR >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                                  <div className='cursor-pointer hover:underline'>
                                  <Link href={"/player/" + row['Player Name']}>
                                    {parseInt(row.Rank)}
                                  </Link>
                                  </div>
                              </div>
                            </StyledTableCell>
                            
                            <StyledTableCell align="center">
                              <ReactCountryFlag countryCode={row.Country} style={{width: '2rem', height: '2rem'}} svg />
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              <div className={row.MMR >= 11000 ? 'text-red-800' : row.MMR >= 9000 ? 'text-violet-700' : row.MMR >= 7500 ? 'text-cyan-200' : row.MMR >= 6000 ? 'text-cyan-600' : row.MMR >= 4500 ? 'text-yellow-500' : row.MMR >= 3000 ? 'text-gray-400' : row.MMR >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                                  <div className='cursor-pointer hover:underline'>
                                  <Link href={"/player/" + row['Player Name']}>
                                    {row['Player Name']}
                                  </Link>
                                  </div>
                              </div>
                            </StyledTableCell>
                            
                            <StyledTableCell align="center">
                              <div className={row.MMR >= 11000 ? 'text-red-800' : row.MMR >= 9000 ? 'text-violet-700' : row.MMR >= 7500 ? 'text-cyan-200' : row.MMR >= 6000 ? 'text-cyan-600' : row.MMR >= 4500 ? 'text-yellow-500' : row.MMR >= 3000 ? 'text-gray-400' : row.MMR >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                              {row.MMR}
                              </div>
                            </StyledTableCell>
                          </StyledTableRow> :





                      <StyledTableRow key={row.player_id}>

                        <StyledTableCell align="center">
                          <div className={row.MMR >= 11000 ? 'text-red-800' : row.MMR >= 9000 ? 'text-violet-700' : row.MMR >= 7500 ? 'text-cyan-200' : row.MMR >= 6000 ? 'text-cyan-600' : row.MMR >= 4500 ? 'text-yellow-500' : row.MMR >= 3000 ? 'text-gray-400' : row.MMR >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                              <div className='cursor-pointer hover:underline'>
                              <Link href={"/player/" + row['Player Name']}>
                                {parseInt(row.Rank)}
                              </Link>
                              </div>
                          </div>
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          <ReactCountryFlag countryCode={row.Country} style={{width: '2rem', height: '2rem'}} svg />
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className={row.MMR >= 11000 ? 'text-red-800' : row.MMR >= 9000 ? 'text-violet-700' : row.MMR >= 7500 ? 'text-cyan-200' : row.MMR >= 6000 ? 'text-cyan-600' : row.MMR >= 4500 ? 'text-yellow-500' : row.MMR >= 3000 ? 'text-gray-400' : row.MMR >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                              <div className='cursor-pointer hover:underline'>
                              <Link href={"/player/" + row['Player Name']}>
                                {row['Player Name']}
                              </Link>
                              </div>
                          </div>
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          <div className={row.MMR >= 11000 ? 'text-red-800' : row.MMR >= 9000 ? 'text-violet-700' : row.MMR >= 7500 ? 'text-cyan-200' : row.MMR >= 6000 ? 'text-cyan-600' : row.MMR >= 4500 ? 'text-yellow-500' : row.MMR >= 3000 ? 'text-gray-400' : row.MMR >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                          {row.MMR}
                          </div>
                        </StyledTableCell>


                        <StyledTableCell align="center">
                          <div className={row.MMR >= 11000 ? 'text-red-800' : row.MMR >= 9000 ? 'text-violet-700' : row.MMR >= 7500 ? 'text-cyan-200' : row.MMR >= 6000 ? 'text-cyan-600' : row.MMR >= 4500 ? 'text-yellow-500' : row.MMR >= 3000 ? 'text-gray-400' : row.MMR >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                            {row['Peak MMR']}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="center">{(row['Win Rate']* 100).toFixed(2)}%</StyledTableCell>

                        <StyledTableCell align="center">{row['Win/Loss (Last 10)']}</StyledTableCell>
                      
                        <StyledTableCell align="center">
                          <div className={row['Gain/Loss (Last 10)'] > 0 ? 'text-green-500': 'text-red-500'}>
                            {row['Gain/Loss (Last 10)']}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            {row['Events Played']}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className={row['Largest Gain'] > 0 ? 'text-green-500': 'text-red-500'}>
                            {row['Largest Gain']}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className={row['Largest Loss'] > 0 ? 'text-green-500': 'text-red-500'}>
                            {row['Largest Loss']}
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{height: 53 * emptyRows}}>
                          <StyledTableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                      <StyledTableRow>
                          <TablePagination
                          rowsPerPageOptions={[10, 25, 50, {label: 'All', value: -1}]}
                          colSpan={columns.length}
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                              inputProps: {
                                  'aria-label': 'rows',
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
  );
}