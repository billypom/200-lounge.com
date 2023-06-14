import '../styles/globals.css'
import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
// import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar'
import SeasonPicker from '../components/SeasonPicker'
import TileGrid from '../components/TileGrid'
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

// export const globalSeason = React.createContext()

export default function App({ Component, pageProps }) {

  // Light / Dark mode for tables?
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  }),
  [prefersDarkMode],
  )


  const [currentSeason, setCurrentSeason] = useState(6)

  return (<>
    <ThemeProvider theme={theme}>
      <Navbar currentSeason={currentSeason}/>
      <SeasonPicker currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} />
      <TileGrid />
      <Component {...pageProps} />
    </ThemeProvider>
  </>)
}

