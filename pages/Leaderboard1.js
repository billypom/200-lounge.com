import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
import styles from '../styles/Home.module.css'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'




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
        'SELECT player_id, player_name, mkc_id, country_code, twitch_link, mmr, peak_mmr FROM player;', (error, rows) => {
          if (error) reject(error);
          else resolve(rows);
        }
      );
    }
    );
    // Parse mysql output into json table
    rows = JSON.parse(JSON.stringify(rows).replace(/\:null/gi, "\:\"\""))
    // End connection to server
    connection.end();
    // return props as object ALWAYS
    return {
      props: { rows }
    }
  }









const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));









export default function Leaderboard({ rows }) {

  console.log(typeof rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    column: columns[0],
    asc: true,
  });

  const [query, setQuery] = useState("")


  // bubble sort the data
  function sort(rows) {
    const {column, asc } = sortedBy;
    return rows.sort((a, b) => {
      if (a[column].toString() > b[column].toString()) return asc ? -1 : 1
      if (b[column].toString() > a[column].toString()) return asc ? 1 : -1
      return 0;
    });
  }

  function filter(rows) {
    return rows.filter((row) => 
      columns.some(
        (column) => row[column] ? row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1 : "")
      );
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>200 Lounge</title>
        <meta name="description" content="MK8DX 200cc Lounge Leaderboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          under construction
        </h1>
        
        <div className="flex flex-col gap-2 w-50">
          <input 
            className="border border-gray-400 text-white placeholder:text-white w-full p-2" type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
              <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 900 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      {
                        columns.map(column => ( column === "player_id" ? <></> :
                          <StyledTableCell className={styles.tableheader}>
                            <div 
                              className={styles.cool_column} 
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
                    {(rowsPerPage >0
                      ? sort(filter(rows)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage):sort(filter(rows))).map((row) => (
                      <StyledTableRow key={row.player_id}>
                        {/* {columns.map(column => <StyledTableCell >{row[column]}</StyledTableCell>)} */}
                        {/* <StyledTableCell align="center">{rows}</StyledTableCell> */}
                        {/* <StyledTableCell align="center">{row.player_id}</StyledTableCell> */}
                        <StyledTableCell align="center">{row.player_name}</StyledTableCell>
                        <StyledTableCell align="center"><a href={"https://mariokartcentral.com/forums/index.php?members/" + row.mkc_id}>MKC</a></StyledTableCell>
                        <StyledTableCell align="center">{row.country_code}</StyledTableCell>
                        <StyledTableCell align="center">{row.twitch_link}</StyledTableCell>
                        <StyledTableCell align="center">{row.mmr}</StyledTableCell>
                        <StyledTableCell align="center">{row.peak_mmr}</StyledTableCell>
                        
                      </StyledTableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                      <TableRow>
                          <TablePagination
                          rowsPerPageOptions={[10, 25, {label: 'All', value: -1}]}
                          colSpan={3}
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
                      </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </div>
          </main>
        </div>
  );
}