import SeasonPreservingLink from './SeasonPreservingLink';
import styles from '../styles/Table.module.css'
import { useState } from 'react';

// B) style..cool...
import { styled } from '@mui/material/styles';

// Table stuff
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

// Icons & things
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';








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
    <Box sx={{ flexShrink: 0, ml: 2.5, /*backgroundColor: '#ff0000'*/ }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon style={{ fill: '#ffffff' }} /> : <FirstPageIcon style={{ fill: '#ffffff' }} />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight style={{ fill: '#ffffff' }} /> : <KeyboardArrowLeft style={{ fill: '#ffffff' }} />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft style={{ fill: '#ffffff' }} /> : <KeyboardArrowRight style={{ fill: '#ffffff' }} />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon style={{ fill: '#ffffff' }} /> : <LastPageIcon style={{ fill: '#ffffff' }} />}
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
    // padding: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
    padding: 3,
    fontWeight: 600,
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


export default function MogiHistory(props) {
  const rows = props.rows
  

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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


  return (<>
    <TableContainer component={Paper} className={styles.leaderboard_style}>
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <div className={styles.table_header_text}>
                event
              </div>
            </StyledTableCell>
            <StyledTableCell>
              <div className={styles.table_header_text}>
                time
              </div>
            </StyledTableCell>
            <StyledTableCell>
              <div className={styles.table_header_text}>
                +/-
              </div>
            </StyledTableCell>
            <StyledTableCell>
              <div className={styles.table_header_text}>
                mmr
              </div>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (

              <StyledTableRow key={row.mogi_id}>

                <StyledTableCell align="center">
                  <SeasonPreservingLink to={`/mogi/` + row.mogi_id}>
                    <div className='cursor-pointer hover:underline text-blue-500'>
                      {row.title}
                    </div>
                  </SeasonPreservingLink>

                </StyledTableCell>

                <StyledTableCell align="center">
                  <div className=''>
                    {(new Date(row.create_date * 1000)).toLocaleString()}
                  </div>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <div className={row.mmr_change > 0 ? 'text-green-500' : 'text-red-500'}>
                    {row.mmr_change}
                  </div>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <div className={row.new_mmr >= 11000 ? 'text-red-800' : row.new_mmr >= 9000 ? 'dark:text-violet-500 text-zinc-900' : row.new_mmr >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : row.new_mmr >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : row.new_mmr >= 4500 ? 'text-yellow-500' : row.new_mmr >= 3000 ? 'text-gray-400' : row.new_mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                    {row.new_mmr}
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <StyledTableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
              colSpan={rows[0].length}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              sx={{ bgcolor: '#0d1d30', color: '#ffffff' }}
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
  </>

  )
}