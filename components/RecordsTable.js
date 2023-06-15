import Link from 'next/link'
import styles from '../styles/RecordsTable.module.css'

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



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
      backgroundColor: theme.palette.action.hover
    },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.disabledBackground
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


export default function RecordsTable(props) {

    console.log(props.data)

    return (<>
        <div className={styles.records_table}>
            <h3 className="text-3xl font-bold p-2">{props.title}</h3>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className={styles.tableheader}>
                                <div className={styles.records_column}>
                                    🏆
                                </div>
                            </StyledTableCell>
                            <StyledTableCell className={styles.tableheader}>
                                <div className={styles.records_column}>
                                    players
                                </div>
                            </StyledTableCell>
                            <StyledTableCell className={styles.tableheader}>
                                <div className={styles.records_column}>
                                    🏁
                                </div>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((row, idx) => (
                            <StyledTableRow key={row.mogi_id}>
                                <StyledTableCell align="center">
                                    <div className="text-4xl">
                                        {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx === 3 ? "4th" : "5th"}
                                    </div>
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    {row.players.split(",").map((player) => (
                                        <div key={player} className="dark:text-cyan-300 text-blue-500 cursor-pointer hover:underline"><Link href={"/player/" + player}>{player}</Link></div>
                                    ))}
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    <div className="dark:text-cyan-300 text-blue-500 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id}><div className="dark:text-cyan-300 text-blue-500 cursor-pointer hover:underline"><Link href={"/mogi/" + row.mogi_id}>{row.score}</Link></div></Link></div>
                                </StyledTableCell>
                            </StyledTableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </>

    )
}