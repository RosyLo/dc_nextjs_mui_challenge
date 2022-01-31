import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '@/components/layout/header';
import { getCustomer } from '@/service/customer';

import { GetServerSideProps } from 'next';

type HomeProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  user?: object;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // You will notice, that there is not login required.
  // We hardcoded jane for demo purposes :-)
  // Don't worry about login.
  const customer = await getCustomer();
  return {
    props: {
      user: {
        id: customer?.id,
        avatar: customer?.avatar,
      },
    },
  };
};

const Home: NextPage<HomeProps> = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <Container>
        <Box sx={{ m: 2, mt: 6 }}>
          <Typography variant="h2" align="center">
            Welcome to DwellersClub!
          </Typography>
          <Typography variant="h4" align="center">
            Please click on your avatar at the top right to display your
            profile.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Home;
