import '../styles/globals.css'
import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
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
  <ThemeProvider />
  <Component {...pageProps} />
  </>
}

export default MyApp
