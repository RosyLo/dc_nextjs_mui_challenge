import { useState, useEffect } from 'react';
import '../styles/globals.css';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Loading from '@/components/common/loading';

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
  const router = useRouter();
  const [isLoading, setIsPageLoading] = useState<boolean>(false);
  useEffect(() => {
    const handleStart = () => {
      setIsPageLoading(true);
    };
    const handleComplete = () => {
      setIsPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      )}
    </>
  );
}

export default MyApp;
