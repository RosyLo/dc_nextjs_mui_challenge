import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import type { AppProps, AppContext } from 'next/app';

const theme = createTheme({
  palette: {
    primary: { main: '#ff5044', },
    secondary: { main: '#626262', },
    error: { main: '#ff1100', },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>)
}

export default MyApp
