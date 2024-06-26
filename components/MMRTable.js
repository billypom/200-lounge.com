import SeasonPreservingLink from './SeasonPreservingLink';
import styles from '../styles/Table.module.css'

// B) style..cool...
import { styled } from '@mui/material/styles';

// Table stuff
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
      // padding: 10,
  },
  [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      padding: 3,
      color: theme.palette.text.primary,
      // color: '#e8e6fc',
      // padding: "20px 0px 20px 0px"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
    // backgroundColor: '#16151a',
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.disabledBackground,
    // backgroundColor: '#050505',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  [`&.${tableRowClasses.footer}`]: {
    fontSize: 13,
    fontWeight: 750,
    color: theme.palette.text.primary,
    // color: '#e8e6fc',
  },
}));


export default function MMRTable(props) {
  const pm = props.rows

  return (<div className='pb-10'>
    <TableContainer component={Paper} className={styles.leaderboard_style}>
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <div className={styles.table_header_text}>
                Player
              </div>
            </StyledTableCell>
            <StyledTableCell>
              <div className={styles.table_header_text}>
                Prev MMR
              </div>
            </StyledTableCell>
            <StyledTableCell>
              <div className={styles.table_header_text}>
                +/-
              </div>
            </StyledTableCell>
            <StyledTableCell>
              <div className={styles.table_header_text}>
                MMR
              </div>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pm.map((p) => (
            <StyledTableRow key={p.player_id}>

              <StyledTableCell align="center">
                <div className={p.prev_mmr >= 11000 ? 'text-red-800' : p.prev_mmr >= 9000 ? 'dark:text-violet-500 text-zinc-900' : p.prev_mmr >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : p.prev_mmr >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : p.prev_mmr >= 4500 ? 'text-yellow-500' : p.prev_mmr >= 3000 ? 'text-gray-400' : p.prev_mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                  <div className='cursor-pointer hover:underline'>
                    <SeasonPreservingLink to={`/player/` + p.player_name}>
                      {p.player_name}
                    </SeasonPreservingLink>
                  </div>
                </div>
              </StyledTableCell>

              <StyledTableCell align="center">
                <div className={p.prev_mmr >= 11000 ? 'text-red-800' : p.prev_mmr >= 9000 ? 'dark:text-violet-500 text-zinc-900' : p.prev_mmr >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : p.prev_mmr >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : p.prev_mmr >= 4500 ? 'text-yellow-500' : p.prev_mmr >= 3000 ? 'text-gray-400' : p.prev_mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                  {p.prev_mmr}
                </div>
              </StyledTableCell>

              <StyledTableCell align="center">
                <div className='font-bold'>
                <div className={p.mmr_change > 0 ? 'text-green-500' : 'text-red-500'}>
                  {p.mmr_change}
                </div>
                </div>
              </StyledTableCell>

              <StyledTableCell align="center">
                <div className='font-bold'>
                <div className={p.new_mmr >= 11000 ? 'text-red-800' : p.new_mmr >= 9000 ? 'dark:text-violet-500 text-zinc-900' : p.new_mmr >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : p.new_mmr >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : p.new_mmr >= 4500 ? 'text-yellow-500' : p.new_mmr >= 3000 ? 'text-gray-400' : p.new_mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                  {p.new_mmr}
                </div>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </div>

  )
}
