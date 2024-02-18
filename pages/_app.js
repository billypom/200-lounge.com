import '../styles/globals.css'
import * as React from 'react';
import Navbar from '../components/Navbar'
import SeasonPicker2 from '../components/SeasonPicker2';
import TileGrid from '../components/TileGrid'
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

export default function App({ Component, pageProps }) {
  // Light / Dark mode for tables?
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  }), [prefersDarkMode])


  const [currentSeason, setCurrentSeason] = useState(7)

  return (<>
    <ThemeProvider theme={theme}>
      <Navbar currentSeason={currentSeason}/>
      <SeasonPicker2 currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} />
      <Component {...pageProps} />
      <TileGrid />
    </ThemeProvider>
  </>)
}

