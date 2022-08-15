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
import Head from 'next/head'
import mysql from 'mysql2'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1d185f',
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    fontWeight: 750,
    backgroundColor: theme.palette.text.primary,
    color: 'white'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.text.secondary
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
  const mogi_id = params.id
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
      'SELECT mogi_id, table_url FROM mogi WHERE mogi_id = ? LIMIT 1;', [mogi_id], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      }
    );
  }
  );
  // Parse mysql output into json table
  results = JSON.parse(JSON.stringify(results))


  let pm = await new Promise((resolve, reject) => {
    connection.query(
      `select p.player_name, pm.player_id, pm.prev_mmr, pm.mmr_change, pm.new_mmr, pm.place
      FROM player_mogi as pm 
      JOIN player as p ON p.player_id = pm.player_id
      WHERE pm.mogi_id = ?
      ORDER BY pm.place ASC`, [mogi_id], (error, pm) => {
        if (error) reject(error);
        else resolve(pm);
      }
    );
  }
  );
  // Parse mysql output into json table
  pm = JSON.parse(JSON.stringify(pm))




  // End connection to server
  connection.end();
  // return props as object ALWAYS
  return {
    props: { results, pm }
  }
}


export default function Mogi({ results, pm }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mogi Details | 200 Lounge</title>
        <meta name="description" content="200 Lounge Mogi Details" />
        <link rel="icon" href="/200.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          mogi
        </h1>
        <div className='max-w-2xl pt-5'>
          <div><Image src={results[0].table_url} alt='mogi results image' width='860' height='520'></Image></div>
          <div className="m-auto p-6 gap-2">
              <TableContainer component={Paper} className={styles.leaderboard_style}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.tableheader}>
                          player
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.tableheader}>
                          prev mmr
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.tableheader}>
                          +/-
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.tableheader}>
                          mmr
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pm.map((p) => (
                      <StyledTableRow key={p.player_id}>

                        <StyledTableCell align="center">
                          <div className={p.prev_mmr >= 11000 ? 'text-red-800' : p.prev_mmr >= 9000 ? 'text-violet-700' : p.prev_mmr >= 7500 ? 'text-cyan-200' : p.prev_mmr >= 6000 ? 'text-cyan-600' : p.prev_mmr >= 4500 ? 'text-yellow-500' : p.prev_mmr >= 3000 ? 'text-gray-400' : p.prev_mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                            <div className='cursor-pointer hover:underline'>
                              <Link href={"/player/" + p.player_name}>
                                {p.player_name}
                              </Link>
                            </div>
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className={p.prev_mmr >= 11000 ? 'text-red-800' : p.prev_mmr >= 9000 ? 'text-violet-700' : p.prev_mmr >= 7500 ? 'text-cyan-200' : p.prev_mmr >= 6000 ? 'text-cyan-600' : p.prev_mmr >= 4500 ? 'text-yellow-500' : p.prev_mmr >= 3000 ? 'text-gray-400' : p.prev_mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                          {p.prev_mmr}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className={p.mmr_change > 0 ? 'text-green-500': 'text-red-500'}>
                            {p.mmr_change}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className={p.new_mmr >= 11000 ? 'text-red-800' : p.new_mmr >= 9000 ? 'text-violet-700' : p.new_mmr >= 7500 ? 'text-cyan-200' : p.new_mmr >= 6000 ? 'text-cyan-600' : p.new_mmr >= 4500 ? 'text-yellow-500' : p.new_mmr >= 3000 ? 'text-gray-400' : p.new_mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                          {p.new_mmr}
                          </div>
                        </StyledTableCell>


                      </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
        </div>
      </main>
    </div>
  )
}
