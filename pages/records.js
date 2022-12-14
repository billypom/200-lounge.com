import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Head from 'next/head'
import mysql from 'mysql2'
import Link from 'next/link'
import styles from '../styles/Home.module.css'



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
        (select pm.mogi_id, GROUP_CONCAT(DISTINCT t.tier_name, m.mogi_format) as tier_format, pm.place, round(sum(pm.score)) as score, round(avg(pm.mmr_change)) as mmr_change, GROUP_CONCAT(p.player_name) as players 
        from player p 
        JOIN player_mogi pm ON p.player_id = pm.player_id 
        JOIN mogi m ON pm.mogi_id = m.mogi_id 
        JOIN tier t ON t.tier_id = m.tier_id 
        group by pm.mogi_id, pm.place, pm.mmr_change, t.tier_name) as n
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

  // today's top score
  // all time top score
  // # of mogis today

  
  // select p.player_name, p.mmr from player p join player_mogi
  // where player_mogi.score = (select max(pm.score) from player_mogi pm join mogi m on pm.mogi_id = m.mogi_id where m.create_date = CURDATE());

  // select p.player_name, p.mmr from player p join player_mogi
  // where player_mogi.score = (select max(pm.score) from player_mogi pm join mogi m on pm.mogi_id = m.mogi_id where m.create_date = '2022-11-15');


  // select 
  // select pm.player_id, pm.score from player_mogi pm join mogi m on pm.mogi_id = m.mogi_id where m.create_date > '2022-11-16';



  // let todays_top_scorer = await new Promise((resolve, reject) => {
  //   connection.query(
  //     ``
  //   )
  // })
  connection.end();
  const all1 = results[0]
  const all2 = results[1]
  const all3 = results[2]
  const all4 = results[3]
  const all6 = results[4]
  const a1 = results[5]
  const a2 = results[6]
  const a3 = results[7]
  const a4 = results[8]
  const a6 = results[9]
  const b1 = results[10]
  const b2 = results[11]
  const b3 = results[12]
  const b4 = results[13]
  const b6 = results[14]
  const c1 = results[15]
  const c2 = results[16]
  const c3 = results[17]
  const c4 = results[18]
  const c6 = results[19]
  const sq2 = results[20]
  const sq3 = results[21]
  const sq4 = results[22]
  const sq6 = results[23]


  // console.log(results)
  return {
    props: { all1, all2, all3, all4, all6, a1, a2, a3, a4, a6, b1, b2, b3, b4, b6, c1, c2, c3, c4, c6, sq2, sq3, sq4, sq6 }
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
    // color: theme.palette.text.primary
    color: '#e8e6fc',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    // backgroundColor: theme.palette.background.paper
    backgroundColor: '#16151a',
  },
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.text.divider
    backgroundColor: '#050505',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  [`&.${tableRowClasses.footer}`]: {
    fontSize: 18,
    fontWeight: 750,
    // color: theme.palette.text.primary
    color: '#e8e6fc',
  },
}));









export default function Leaderboard({ all1, all2, all3, all4, all6, a1, a2, a3, a4, a6, b1, b2, b3, b4, b6, c1, c2, c3, c4, c6, sq2, sq3, sq4, sq6 }) {
  // console.log('hello')
  return (
    <div className={styles.container}>
      <Head>
        <title>200 Lounge | Records</title>
        <meta name="description" content="MK8DX 200cc Lounge Records" />
        <link rel="icon" href="/200.png" />
      </Head>
      <main className={styles.main}>
        {/* <TileGrid /> */}
        <h1 className={styles.title}>
          records
        </h1>

        <div className="flex flex-col text-center z-10 items-center">
            <h2 className={styles.tier_title}>
              {/* <div className={styles.tier_title_background}></div> */}
              tier all</h2>
          <div className="flex flex-row flex-wrap">
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">FFA</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {all1.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }><div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div></Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">2v2</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {all2.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">3v3</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {all3.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">4v4</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {all4.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">6v6</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {all6.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>














          <h2 className={styles.tier_title}>tier a</h2>
          <div className="flex flex-row flex-wrap">
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">FFA</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {a1.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">2v2</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {a2.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">3v3</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {a3.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">4v4</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {a4.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">6v6</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {a6.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>














          <h2 className={styles.tier_title}>tier b</h2>
          <div className="flex flex-row flex-wrap">
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">FFA</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {b1.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">2v2</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {b2.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">3v3</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {b3.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">4v4</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {b4.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">6v6</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {b6.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>




















          <h2 className={styles.tier_title}>tier c</h2>
          <div className="flex flex-row flex-wrap">
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">FFA</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {c1.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">2v2</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {c2.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">3v3</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {c3.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">4v4</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {c4.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">6v6</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {c6.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>


















          <h2 className={styles.tier_title}>squad queue</h2>
          <div className="flex flex-row flex-wrap">
            {/* <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">FFA</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sq2.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                        </StyledTableCell>

                        <StyledTableCell align="center">

                        </StyledTableCell>

                        <StyledTableCell align="center">
                          
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div> */}
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">2v2</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sq2.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">3v3</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sq3.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">4v4</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sq4.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>

                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.records_table}>
              <h3 className="text-3xl font-bold p-2">6v6</h3>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          players
                        </div>
                      </StyledTableCell>
                      <StyledTableCell className={styles.tableheader}>
                        <div className={styles.cool_column}>
                          ????
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sq6.map((row, idx) => (
                      <StyledTableRow key={row.mogi_id}>
                        <StyledTableCell align="center">
                          <div className="text-4xl">
                            {idx === 0 ? "????" : idx === 1 ? "????" : idx === 2 ? "????" : idx === 3 ? "4th" : "5th"}
                          </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.players.split(",").map((player) => (
                            <div key={player} className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                          ))}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <div className="text-cyan-300 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id }>{row.score}</Link></div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}