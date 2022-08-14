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
import { useState } from 'react';
import Head from 'next/head'
import mysql from 'mysql2'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import ReactCountryFlag from "react-country-flag"






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
    connection.connect();
    const results = []
    const expected_names = ["all1", "all2", "all3", "all4", "all6", "a1", "a2", "a3", "a4", "a6", "b1", "b2", "b3", "b4", "b6", "c1", "c2", "c3", "c4", "c6", "sq2", "sq3", "sq4", "sq6"]
    for (var i = 0; i < expected_names.length; i++) {
      let stuff = await new Promise((resolve, reject) => {
        connection.query(
          `select tier_format, mogi_id, score, players FROM
          (select pm.mogi_id, GROUP_CONCAT(DISTINCT t.tier_name, m.mogi_format) as tier_format, pm.place, round(sum(pm.score)) as score, GROUP_CONCAT(p.player_name) as players from player p JOIN player_mogi pm ON p.player_id = pm.player_id JOIN mogi m ON pm.mogi_id = m.mogi_id JOIN tier t ON t.tier_id = m.tier_id WHERE pm.place < 5 group by pm.mogi_id, pm.place, t.tier_name) as n
          where tier_format = ? order by score desc LIMIT 5`, [expected_names[i]], (error, stuff) => {
            if (error) reject(error);
            else resolve(stuff);
          }
        );
      }
      );
      stuff = JSON.parse(JSON.stringify(stuff).replace(/\:null/gi, "\:\"\""))
      // stuff["title"] = "tier-" + expected_names[i].slice(0, -1)
      results.push(stuff)
    }
    connection.end();

    JSON.stringify(results)
    return {
      props: { results }
    }
  }




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.text.secondary,
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









export default function Leaderboard({ results }) {
  console.log('hello')
  console.log(results)
  return (
    <div className={styles.container}>
      <Head>
        <title>Records | 200 Lounge</title>
        <meta name="description" content="MK8DX 200cc Lounge Records" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          under construction
        </h1>
        
        <div className="flex flex-col gap-2">
          {results.map((format, idx) => (
              <div className='flex-2xl font-bold'>{JSON.stringify(format).tier_format}</div>
          ))}
            {/* <h2 className={styles.title}>Tier-All</h2>
              <div className="flex flex-row flex-wrap">
                <div>
                <h3 className="text-3xl font-bold p-2">FFA</h3>
                <TableContainer component={Paper}>
                  <Table stickyHeader aria-label="customized table">
                    <TableHead>
                      <TableRow>
                            <StyledTableCell className={styles.tableheader}>
                              <div className={styles.cool_column}>
                                  🏆
                              </div>
                            </StyledTableCell>
                            <StyledTableCell className={styles.tableheader}>
                              <div className={styles.cool_column}>
                                  Players
                              </div>
                            </StyledTableCell>
                            <StyledTableCell className={styles.tableheader}>
                              <div className={styles.cool_column}>
                                  🏁
                              </div>
                            </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results.map((row, idx) => (
                        <StyledTableRow>
                          <StyledTableCell align="center">
                            <div className="text-4xl">
                            {idx ===0 ? "🥇" : idx ===1 ? "🥈" : idx === 2 ? "🥉" : idx === 3 ? "4th" : "5th"}
                            </div>
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {row.players.split(",").map((player) => (
                              <div className="font text-blue-600 cursor-pointer hover:underline"><Link href={"/player/" + {player}}>{player}</Link></div>
                            ))}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {row.score}
                          </StyledTableCell>
                        </StyledTableRow>
                        
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                </div>
              </div> */}
        </div>
      </main>
    </div>
  );
}