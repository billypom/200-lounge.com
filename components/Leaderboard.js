import Link from 'next/link'
import styles from '../styles/Table.module.css'
import { useRef, useState, useEffect } from 'react'

// not sure? makes it work
import PropTypes from 'prop-types'


// Table stuff
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow, { tableRowClasses } from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'

// Icons & stuff
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import ReactCountryFlag from "react-country-flag"

// theme is required? i guess
import { useTheme } from '@mui/material/styles'


export default function Leaderboard(props) {
    let rows = props.rows
    const current_season = props.season
    const isMobile = props.isMobile
    const theme = useTheme();


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#1d185f',
            fontSize: 20,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 18,
            fontWeight: 750,
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

    function TablePaginationActions(props) {
        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
            executeScroll()
        };

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
            executeScroll()
        };

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
            executeScroll()
        };

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
            executeScroll()
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


    //--------------------------------------------------------------------------- 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
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
        return rows.sort(function (a, b) {
            // I removed a[column].toString() in order to sort numbers properly.
            // There should be no type mismatches in my data... i think
            try {
                // Sort by country
                // I guess the country flag object I am using gets parsed to NaN - need to account for this
                if (column == 'country') {
                    throw err
                }
                // Sort decimal numbers
                var x = parseFloat(a[column])
                var y = parseFloat(b[column])
            } catch {
                // Sort strings
                var x = a[column]
                var y = b[column]
            } finally {
                // console.log('x: ',x, typeof x)
                if (x > y) return asc ? -1 : 1
                if (y > x) return asc ? 1 : -1
            }
            return 0;
        });
    }
    function filter(rows) {
        return rows.filter((row) =>
            columns.some(
                (column) => row[column] ? row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1 : "")
        );
    }

    // Sticky header on scroll ?
    const tableHeaderRef = useRef()
    let [headerYScrolled, setHeaderYScrolled] = useState(false)
    useEffect(() => {
        const options = { passive: true }; // options must match add/remove event
        const scroll = (event) => {
         const { pageYOffset, scrollY } = window;
        //  console.log('yOffset', pageYOffset, 'scrollY', scrollY)
         let tableHeaderY = tableHeaderRef.current.offsetTop
        //  console.log('table y', tableHeaderY)

        if (scrollY >= tableHeaderY) {
            // console.log('trueeeeee')
            setHeaderYScrolled(true)
        } else {
            // console.log('falseeeeee')
            setHeaderYScrolled(false)
        }
        // console.log('state header scroll', headerYScrolled)


        };
        document.addEventListener("scroll", scroll, options);
        // remove event on unmount to prevent a memory leak
        () => document.removeEventListener("scroll", scroll, options);
       }, [headerYScrolled]);








    const tableHeader = useRef(null)
    const executeScroll = () => tableHeader.current.scrollIntoView()



    return (<>

        <div className="pb-3 gap-2 z-10 text-2xl">
            <input
                className="border border-gray-400 text-black placeholder:text-gray p-2 max-w-lg"
                type="text"
                placeholder="(search)"
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
        </div>
        {/* search bar */}

        {/* leaderboard, table */}
        <div className="m-auto p-1 z-10">
            <TableContainer component={Paper} >
                <Table stickyHeader aria-label="customized table" ref={tableHeaderRef}>
                    {/* header */}
                    <TableHead ref={tableHeader} className={headerYScrolled ? styles.sticky_header : styles.nothing_header }>
                        <TableRow key={"header"}>
                            {
                                columns.map((column, idx) => (column === "player_id" ? <></> : isMobile && column === "country" || isMobile && idx > 4 ? <></> :
                                    <StyledTableCell align="center">
                                        <div
                                            className={styles.table_header_text}
                                            onClick={() => setSortedBy((prev) => ({ column: column, asc: !prev.asc }))}>
                                            <div>{column}</div>
                                            <div>{sortedBy.column === column &&
                                                (sortedBy.asc
                                                    ? <ChevronUpIcon className="w-5 h-5" />
                                                    : <ChevronDownIcon className="w-5 h-5" />
                                                )}
                                            </div>
                                        </div>
                                    </StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    {/* data */}
                    <TableBody>
                        
                        {/* each record gets these divs */}
                        {(rowsPerPage > 0
                            ? sort(filter(rows)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : sort(filter(rows))).map((row, idx) => (
                                isMobile ?
                                    <StyledTableRow key={row.player_id}>
                                        <StyledTableCell align="center">
                                            <div className={row.mmr >= 11000 ? 'text-red-800' : row.mmr >= 9000 ? 'dark:text-violet-500 text-zinc-900' : row.mmr >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : row.mmr >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : row.mmr >= 4500 ? 'text-yellow-500' : row.mmr >= 3000 ? 'text-gray-400' : row.mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                                                <div className={'cursor-pointer hover:underline'}>
                                                    <Link href={current_season == 6 ? "/player/" + row['player name'] : `/s${current_season}/player/${row['player name']}`}>
                                                        {parseInt(row.rank)}
                                                    </Link>
                                                </div>
                                            </div>
                                        </StyledTableCell>

                                        {/* <StyledTableCell align="center">
                                <ReactCountryFlag countryCode={row.country} style={{width: '2rem', height: '2rem'}} svg />
                              </StyledTableCell> */}
                                        {/* {console.log(row)} */}
                                        <StyledTableCell align="center" >
                                            <div className={row.mmr >= 11000 ? 'text-red-800' : row.mmr >= 9000 ? 'dark:text-violet-500 text-zinc-900' : row.mmr >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : row.mmr >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : row.mmr >= 4500 ? 'text-yellow-500' : row.mmr >= 3000 ? 'text-gray-400' : row.mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                                                <div className='cursor-pointer hover:underline'>
                                                    <Link href={current_season == 6 ? "/player/" + row['player name'] : `/s${current_season}/player/${row['player name']}`}>
                                                        {row['player name']}
                                                    </Link>
                                                </div>
                                            </div>
                                        </StyledTableCell>

                                        <StyledTableCell align="center">
                                            <div className={row.mmr >= 11000 ? 'text-red-800' : row.mmr >= 9000 ? 'dark:text-violet-500 text-zinc-900' : row.mmr >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : row.mmr >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : row.mmr >= 4500 ? 'text-yellow-500' : row.mmr >= 3000 ? 'text-gray-400' : row.mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                                                {row.mmr}
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow> :





                                    <StyledTableRow key={row.player_id}>

                                        <StyledTableCell align="center">
                                            <div className={row.mmr >= 11000 ? 'text-red-800' : row.mmr >= 9000 ? 'dark:text-violet-500 text-zinc-900' : row.mmr >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : row.mmr >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : row.mmr >= 4500 ? 'text-yellow-500' : row.mmr >= 3000 ? 'text-gray-400' : row.mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                                                <div className='cursor-pointer hover:underline'>
                                                    <Link href={current_season == 6 ? "/player/" + row['player name'] : `/s${current_season}/player/${row['player name']}`}>
                                                        {parseInt(row.rank)}
                                                    </Link>
                                                </div>
                                            </div>
                                        </StyledTableCell>

                                        <StyledTableCell align="center">
                                            <ReactCountryFlag countryCode={row.country} style={{ width: '2rem', height: '2rem' }} svg />
                                        </StyledTableCell>

                                        <StyledTableCell align="center">
                                            <div className={row.mmr >= 11000 ? 'text-red-800' : row.mmr >= 9000 ? 'dark:text-violet-500 text-zinc-900' : row.mmr >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : row.mmr >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : row.mmr >= 4500 ? 'text-yellow-500' : row.mmr >= 3000 ? 'text-gray-400' : row.mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                                                <div className='cursor-pointer hover:underline'>
                                                    <Link href={current_season == 6 ? "/player/" + row['player name'] : `/s${current_season}/player/${row['player name']}`}>
                                                        {row['player name']}
                                                    </Link>
                                                </div>
                                            </div>
                                        </StyledTableCell>

                                        <StyledTableCell align="center">
                                            <div className={row.mmr >= 11000 ? 'text-red-800' : row.mmr >= 9000 ? 'dark:text-violet-500 text-zinc-900' : row.mmr >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : row.mmr >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : row.mmr >= 4500 ? 'text-yellow-500' : row.mmr >= 3000 ? 'text-gray-400' : row.mmr >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                                                {row.mmr}
                                            </div>
                                        </StyledTableCell>


                                        <StyledTableCell align="center">
                                            <div className={row['peak mmr'] >= 11000 ? 'text-red-800' : row['peak mmr'] >= 9000 ? 'dark:text-violet-500 text-zinc-900' : row['peak mmr'] >= 7500 ? 'dark:text-cyan-200 text-cyan-500' : row['peak mmr'] >= 6000 ? 'dark:text-cyan-600 text-cyan-900' : row['peak mmr'] >= 4500 ? 'text-yellow-500' : row['peak mmr'] >= 3000 ? 'text-gray-400' : row['peak mmr'] >= 1500 ? 'text-orange-400' : 'text-stone-500'}>
                                                {row['peak mmr']}
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{(row['win rate'] * 100).toFixed(2)}%</StyledTableCell>
                                        {/* 
                          <StyledTableCell align="center">{row['Win/Loss (Last 10)']}</StyledTableCell>
                        
                          <StyledTableCell align="center">
                            <div className={row['Gain/Loss (Last 10)'] > 0 ? 'text-green-500': 'text-red-500'}>
                              {row['Gain/Loss (Last 10)']}
                            </div>
                          </StyledTableCell> */}

                                        <StyledTableCell align="center">
                                            {row['events played']}
                                        </StyledTableCell>

                                        <StyledTableCell align="center">
                                            {parseFloat(row['partner avg'])}
                                            {/* {score_stuff[idx]["avg score"]} */}
                                        </StyledTableCell>

                                        <StyledTableCell align="center">
                                            {parseFloat(row['avg score'])}
                                            {/* {pa[idx]["pa"]} */}
                                        </StyledTableCell>





                                        <StyledTableCell align="center">
                                            <div className={row['largest gain'] > 0 ? 'text-green-500' : 'text-red-500'}>
                                                {row['largest gain']}
                                            </div>
                                        </StyledTableCell>

                                        <StyledTableCell align="center">
                                            <div className={row['largest loss'] > 0 ? 'text-green-500' : 'text-red-500'}>
                                                {row['largest loss']}
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                            ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <StyledTableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    {/* footer */}
                    <TableFooter>
                        <StyledTableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1, bgcolor: '#000000' }]}
                                colSpan={columns.length}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                sx={{ bgcolor: '#1d185f', color: '#ffffff' }}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows',
                                    },
                                    native: true
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
    </>
    )
}