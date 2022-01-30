import '../styles/globals.css';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import type { AppProps } from 'next/app';

const theme: Theme = createTheme({
  palette: {
    primary: { main: '#ff5044', contrastText: '#ffffff' },
    secondary: { main: '#626262' },
    error: { main: '#ff1100' },
    info: {
      main: '#ffffff',
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
    },
  },
  zIndex: {
    drawer: 1200,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
