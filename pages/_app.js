import '../styles/globals.css'
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar'

// const theme = createTheme({
//   palette: {
//     headerbg: {

//     }
//   },
// });


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


function YourApp() {

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      {/* {theme.palette.mode} mode */}
    </>
  );
}

export default function ToggleColorMode({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (<>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme/>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  </>)
}

