import styles from '../styles/Table.module.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SeasonPreservingLink from './SeasonPreservingLink';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1d185f',
        fontSize: 18,
        // padding: 10,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
        padding: 8,
        fontWeight: 400,
        color: theme.palette.text.primary,
        // color: '#e8e6fc',
        // padding: "20px 0px 20px 0px"
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
                                    Players
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
                                        <div key={player} className="dark:text-cyan-500 text-blue-500 cursor-pointer hover:underline">
                                            <SeasonPreservingLink to={"/player/" + player}>
                                                {player}
                                            </SeasonPreservingLink>
                                        </div>
                                    ))}
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    <div className="dark:text-cyan-500 text-blue-500 cursor-pointer hover:underline">
                                        <SeasonPreservingLink to={"/mogi/" + row.mogi_id}>
                                            {row.score}
                                        </SeasonPreservingLink>
                                    </div>
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
