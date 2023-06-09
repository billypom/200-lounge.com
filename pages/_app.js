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
import { ThemeContext } from '@emotion/react';

export const globalSeason = React.createContext()

export default function App({ Component, pageProps }) {

  const [currentSeason, setCurrentSeason] = useState(5)

  return (<>
    <ThemeContext.Provider value={currentSeason}>
      <Navbar currentSeason={currentSeason}/>
      <SeasonPicker currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} />
      <TileGrid />
      <Component {...pageProps} />
    </ThemeContext.Provider>
  </>)
}

