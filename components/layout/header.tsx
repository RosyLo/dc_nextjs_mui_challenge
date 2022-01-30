import { useRouter } from 'next/router';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';

type HeaderProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  user?: any;
};

export default function Header({
  title,
  subtitle,
  description,
  user,
}: HeaderProps) {
  const router = useRouter();

  const showProfile = () => {
    let targetUrl = '/customer/profile/' + user?.id;
    router.push(targetUrl);
  };

  const showHome = () => {
    let targetUrl = '/';
    router.push(targetUrl);
  };

  let titleSeparator = '';
  if (subtitle?.length) {
    titleSeparator = ' - ';
  }

  return (
    <Container maxWidth="lg">
      <Head>
        <title>
          {title || 'Dwellers Club'} {titleSeparator} {subtitle}
        </title>
        <meta
          name="description"
          content={description || 'Dwellers Club - Official Website'}
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Container>&nbsp;</Container>
      <Box mb={3} mt={1}>
        <Grid container>
          <Grid item xs={6}>
            <Button onClick={showHome}>
              <Box
                component="img"
                src="/images/dcLogoBlack.png"
                sx={{
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
              />
            </Button>
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={1} justifyContent="flex-end">
            <Box>
              <Button onClick={showProfile}>
                <Avatar alt="You" src={user.avatar} />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </Container>
  );
}
