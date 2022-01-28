import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import type { AppProps, AppContext } from 'next/app';

const theme = createTheme({
  palette: {
    primary: { main: '#ff5044', contrastText: '#ffffff'},
    secondary: { main: '#626262', },
    error: { main: '#ff1100', },
    info: {
      main: '#ffffff'
    },
  },
  typography: {
    h3: {
      fontWeight: 800,
      fontSize: '1.25rem',
    },
    body1: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>)
}

export default MyApp
