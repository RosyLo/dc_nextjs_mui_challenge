import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
// -- mui component -- //
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// -- mui icon -- //
import Email from '@mui/icons-material/Email';
import MapsHomeWork from '@mui/icons-material/MapsHomeWork';
import { getCustomer, getAddress } from '@/service/customer';
import Header from '@/components/layout/header';
import { Block } from '@/components/common/block';
import { getAllContracts } from '@/service/contract/index';
import { Text, Title } from '@/components/common/text';
import homeOwner from '@/components/asset/home_owner@2x.png';
import roundToTwo from '@/utils/roundto';
import getContractGroups from '@/provider/profile/getContractGroups';
import Navigator, {
  getSelectContractGroup,
  InsuranceGroup,
  ContractGroup,
  ContractData,
} from '@/components/layout/navigator';

type UserProps = {
  user?: any;
  contracts?: ContractGroup;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const customer = await getCustomer();
  const address = await getAddress(customer?.addressId);
  const contracts = await getAllContracts(customer?.id);
  const contractGroup = getContractGroups(contracts);

  return {
    props: {
      user: {
        id: customer?.id,
        avatar: customer?.avatar,
        firstname: customer?.firstname,
        lastname: customer?.lastname,
        birthdate: customer?.birthdate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        email: customer?.email,
        address,
      },
      contracts: {
        homeOwnerContracts: contractGroup.homeOwnerContracts,
        homeContentContracts: contractGroup.homeContentContracts,
        bikeContracts: contractGroup.bikeContracts,
      },
    },
  };
};

const User: NextPage<UserProps> = ({ user, contracts }) => {
  const cardId = `card - ${uuidv4()}`;

  const { avatar, firstname, lastname, birthdate, email, address } = user;
  const { number, street, city, country, postcode } = address;

  const [choosedInsuranceGroup, setChoosedInsuranceGroup] = useState(
    InsuranceGroup.HomeOwner
  );

  const displayContractGroup = getSelectContractGroup(
    contracts,
    choosedInsuranceGroup
  );

  return (
    <Container>
      <Header user={user} />
      <Box sx={{ display: 'flex', p: '0 24px' }}>
        <Stack
          sx={{ width: '30%', bgcolor: 'primary.main', color: 'white' }}
          spacing={5}
        >
          <Block>
            <Avatar
              alt="You"
              src={avatar}
              sx={{ border: '2px solid white', width: '60px', height: '60px' }}
            />
            <Box sx={{ marginLeft: '20px' }}>
              <Typography variant="body1" component="div">
                {firstname} {lastname}
              </Typography>
              <Typography variant="subtitle1" component="div">
                {birthdate}
              </Typography>
            </Box>
          </Block>
          <Box>
            <MenuList>
              <MenuItem>
                <ListItemIcon>
                  <Email color="info" />
                </ListItemIcon>
                <ListItemText>
                  <Text color={'common.white'}>{email}</Text>
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <MapsHomeWork fontSize="small" color="info" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ style: { whiteSpace: 'normal' } }}
                >
                  <Text color={'common.white'}>
                    {number}
                    {street}
                    {city}
                    {country}
                    {postcode}
                  </Text>
                </ListItemText>
              </MenuItem>
            </MenuList>
            <Navigator setChoosedInsuranceGroup={setChoosedInsuranceGroup} />
          </Box>
        </Stack>
        <Box sx={{ width: '70%', padding: '50px' }}>
          <Title>{displayContractGroup.typeName}</Title>
          <Grid container sx={{ marginTop: '20px' }}>
            {displayContractGroup?.data.map((contract: ContractData) => {
              const { typeName, paymentPeriod, price } = contract;
              return (
                <Grid item key={cardId}>
                  <Link href={`/../customer/contract/${contract.id}`} passHref>
                    <Card
                      sx={{
                        maxWidth: 345,
                        padding: '15px',
                        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.25)',
                        '&:hover': {
                          cursor: 'pointer',
                        },
                      }}
                    >
                      <CardMedia>
                        {/* // todo: picture from contract*/}
                        <Image
                          src={homeOwner}
                          alt="Picture of the author"
                          width="350px"
                          height="300px"
                        />
                      </CardMedia>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {/* todo: naming by customer */}
                          {typeName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          address
                        </Typography>
                        <Stack
                          spacing={2}
                          direction="row"
                          divider={<Divider orientation="vertical" flexItem />}
                        >
                          <Stack spacing={2} sx={{ width: '105px' }}>
                            <Typography variant="body2">Type</Typography>
                            <Box>{typeName}</Box>
                          </Stack>
                          <Stack spacing={2} sx={{ width: '60px' }}>
                            <Typography variant="body2">Payment</Typography>
                            <Box>{paymentPeriod}</Box>
                          </Stack>
                          <Stack spacing={2}>
                            <Typography variant="body2">Price</Typography>
                            <Box>{roundToTwo(price)}</Box>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default User;
