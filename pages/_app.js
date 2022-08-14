import '../styles/globals.css'
import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import Navbar from '../components/Navbar';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
      grandmaster: '#AE0000',
      master: '#A580BB',
      diamond: '#C7E5EB',
      platinum: '#488C8E',
      gold: '#FFC900',
      silver: '#DEDEDE',
      bronze: '#B87B23',
      iron: '#6C6357',
      peak: '#FFE400',
      positive: '#51FF1E',
      negative: '#FF1E1E',
      white: '#FFFFFF',
      dark: '#202020',
      lessdark: '#464646',
      hyperlink: '#00C9FF',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return <>
  <Navbar/>
  <ThemeProvider theme={theme}/>
  <Component {...pageProps} />
  </>
}

export default MyApp
