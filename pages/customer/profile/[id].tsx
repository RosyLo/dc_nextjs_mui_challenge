import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Contract } from '@prisma/client';
import Container from '@mui/material/Container';
import {
  Box,
  Avatar,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import {
  Email,
  Home,
  ArrowForwardIos,
  BedroomParent,
  PedalBike,
  MapsHomeWork,
} from '@mui/icons-material';
import { getCustomer } from '../../api/customer/profile/[id]';
import { getAddress } from '../../api/customer/profile/address';
import Header from '../../../components/layout/header';
import { Block } from '../../../components/common/block';
import { getAllContracts } from '../../api/customer/contract/index';
import { Text, Title } from '../../../components/common/text';
import homeOwner from '../../../components/asset/home_owner@2x.png';
import roundToTwo from '../../../utils/roundto';

interface ContractInfo {
  type: string;
  typeName?: string;
  data?: ContractData[];
}

interface ContractData extends Contract {
  typeName: string;
}

type UserProps = {
  user?: any;
  contracts?: {
    homeOwnerContracts: ContractInfo;
    homeContentContracts: ContractInfo;
    bikeContracts: ContractInfo;
  };
};

const getContractGroups = (contracts: Contract[]) => {
  let homeOwnerData: ContractInfo = {
    type: 'HOME_OWNER',
    typeName: 'Home Owner',
    data: [],
  };
  let homeContentData: ContractInfo = {
    type: 'HOME_CONTENT',
    typeName: 'Home Content',
    data: [],
  };
  let bikeData: ContractInfo = {
    type: 'BIKE',
    typeName: 'Bike',
    data: [],
  };

  contracts.forEach((contract) => {
    switch (contract?.type) {
      case 'HOME_OWNER':
        homeOwnerData.data?.push({ ...contract, typeName: 'Home Owner' });
        break;
      case 'HOME_CONTENT':
        homeContentData.data?.push({ ...contract, typeName: 'Home Content' });
        break;
      case 'BIKE':
        bikeData.data?.push({ ...contract, typeName: 'Bike' });
        break;
      default:
        break;
    }
  });
  const homeOwnerContracts = JSON.parse(JSON.stringify(homeOwnerData));
  const homeContentContracts = JSON.parse(JSON.stringify(homeContentData));
  const bikeContracts = JSON.parse(JSON.stringify(bikeData));
  return { homeOwnerContracts, homeContentContracts, bikeContracts };
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

enum InsuranceGroup {
  HomeOwner,
  HomeContent,
  Bike,
}

const User: NextPage<UserProps> = ({ user, contracts }) => {
  const cardId = `${uuidv4()}`;

  const { avatar, firstname, lastname, birthdate, email, address } = user;
  const { number, street, city, country, postcode } = address;
  const { homeOwnerContracts, homeContentContracts, bikeContracts } = contracts;

  const [choosedInsuranceGroup, setChoosedInsuranceGroup] = useState(
    InsuranceGroup.HomeOwner
  );

  const getSelectContractGroup = () => {
    switch (choosedInsuranceGroup) {
      case InsuranceGroup.HomeOwner:
        return homeOwnerContracts;
      case InsuranceGroup.HomeContent:
        return homeContentContracts;
      case InsuranceGroup.Bike:
        return bikeContracts;
      default:
        return homeOwnerContracts;
    }
  };
  const displayContractGroup = getSelectContractGroup();

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
                {lastname} {firstname}
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
          </Box>
          <Box>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setChoosedInsuranceGroup(InsuranceGroup.HomeOwner);
                }}
              >
                <ListItemIcon>
                  <Home fontSize="small" color="info" />
                </ListItemIcon>
                <ListItemText>
                  <Text color={'common.white'}>Home Owner</Text>
                </ListItemText>
                <ArrowForwardIos fontSize="small" color="info" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setChoosedInsuranceGroup(InsuranceGroup.HomeContent);
                }}
              >
                <ListItemIcon>
                  <BedroomParent fontSize="small" color="info" />
                </ListItemIcon>
                <ListItemText>
                  <Text color={'common.white'}>Home Content</Text>
                </ListItemText>
                <ArrowForwardIos fontSize="small" color="info" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setChoosedInsuranceGroup(InsuranceGroup.Bike);
                }}
              >
                <ListItemIcon>
                  <PedalBike fontSize="small" color="info" />
                </ListItemIcon>
                <ListItemText>
                  <Text color={'common.white'}>Bike</Text>
                </ListItemText>
                <ArrowForwardIos fontSize="small" color="info" />
              </MenuItem>
            </MenuList>
          </Box>
        </Stack>
        <Box sx={{ width: '70%', padding: '50px' }}>
          <Title>{displayContractGroup.typeName}</Title>
          <Grid container sx={{ marginTop: '20px' }}>
            {displayContractGroup.data.map((contract) => {
              return (
                <Grid item key={cardId}>
                  <Link href={`/../customer/contract/${contract.id}`}>
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
                          {contract.typeName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          address
                        </Typography>
                        <Stack
                          spacing={2}
                          direction="row"
                          divider={<Divider orientation="vertical" flexItem />}
                        >
                          <Stack spacing={2}>
                            <Typography variant="body2">Type</Typography>
                            <Box>{contract.typeName}</Box>
                          </Stack>
                          <Stack spacing={2}>
                            <Typography variant="body2">Payment</Typography>
                            <Box>{contract.paymentPeriod}</Box>
                          </Stack>
                          <Stack spacing={2}>
                            <Typography variant="body2">Price</Typography>
                            <Box>{roundToTwo(contract.price)}</Box>
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
