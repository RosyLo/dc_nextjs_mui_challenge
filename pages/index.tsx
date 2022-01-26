import type { NextPage } from 'next'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material'
import Header from '../components/dc/header';
import { getCustomer } from './api/customer/profile/[id]';

import { GetServerSideProps } from 'next'


type HomeProps = {
  title?: string,
  subtitle?: string,
  description?: string,
  user?: object
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // You will notice, that there is not login required. 
  // We hardcoded jane for demo purposes :-)
  // Don't worry about login.
  let customer = await getCustomer();
  return {
    props: {
      user: {
        id: customer?.id,
        avatar: customer?.avatar
      }
    }
  }
}

const Home: NextPage<HomeProps> = ({ title, subtitle, user }: HomeProps) => {
  return (
    <>
      <Header title={title} subtitle={subtitle} user={user} />
      <Container>
        <Container sx={{ m: 2, mt: 6 }}>
          <Typography variant="h2" align="center">
            Welcome to DwellersClub!
          </Typography>
          <Typography variant="h4" align="center">
            Please click on your avatar at the top right to display your profile.
          </Typography>
        </Container>
      </Container>
    </>
  )
}

export default Home
