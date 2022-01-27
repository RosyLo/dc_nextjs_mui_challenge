import { useState} from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { Contract } from '@prisma/client';
import Container from '@mui/material/Container';
import { Box, Avatar, MenuList, MenuItem, ListItemIcon, ListItemText, Stack, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Email, Home, ArrowForwardIos, BedroomParent, PedalBike} from '@mui/icons-material';
import { getCustomer } from '../../api/customer/profile/[id]';
import Header from '../../../components/layout/header';
import { Block } from '../../../components/common/block';
import { getAllContracts } from '../../api/customer/contract/index';
import { Text} from '../../../components/common/text';

interface ContractInfo {
    type: string,
    typeName?: string,
    data?: ContractData[]
}

interface ContractData extends Contract{
    typeName: string;
}

type UserProps = {
    user?: any;
    contracts?: {
        homeOwnerContracts: ContractInfo,
        homeContentContracts: ContractInfo,
        bikeContracts: ContractInfo,
    }
}

const getContractGroups = (contracts: Contract[]) => {
    let homeOwnerData: ContractInfo = {
        type: 'HOME_OWNER',
        typeName: 'Home Owner',
        data:[],
    };
    let homeContentData: ContractInfo  = {
        type: 'HOME_CONTENT',
        typeName: 'Home Content',
        data:[],
    };
    let bikeData: ContractInfo  = {
        type: 'BIKE',
        typeName: 'Bike',
        data:[],
    };

    contracts.forEach((contract) => {
        switch (contract?.type) {
            case 'HOME_OWNER':
                homeOwnerData.data?.push({...contract, typeName: 'Home Owner'});
            break;
            case 'HOME_CONTENT':
                console.log('in',contract)
                homeContentData.data?.push({...contract, typeName: 'Home Content'});
            break;
            case 'BIKE':
                bikeData.data?.push({...contract,  typeName: 'Bike'});
            break;
            default: 
                break;
        }
    });
    const homeOwnerContracts = JSON.parse(JSON.stringify(homeOwnerData));
    const homeContentContracts = JSON.parse(JSON.stringify(homeContentData));
    const bikeContracts = JSON.parse(JSON.stringify(bikeData));
    return {homeOwnerContracts, homeContentContracts, bikeContracts}
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const customer = await getCustomer();
    //get address
    const contracts = await getAllContracts(customer?.id);
    const contractGroup = getContractGroups(contracts);

    return {
      props: {
        user: {
          id: customer?.id,
          avatar: customer?.avatar,
          firstname: customer?.firstname,
          lastname: customer?.lastname,
          birthdate: customer?.birthdate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          email: customer?.email,
        },
        contracts: {
            homeOwnerContracts: contractGroup.homeOwnerContracts,
            homeContentContracts: contractGroup.homeContentContracts,
            bikeContracts: contractGroup.bikeContracts,
        }
      }
    }
}

enum InsuranceGroup {
    HomeOwner,
    HomeContent,
    Bike
}

const User: NextPage<UserProps> = ({user}) => {

    const {avatar, firstname, lastname, birthdate, email} = user;

    const [choosedInsuranceGroup, setChoosedInsuranceGroup] = useState(InsuranceGroup.HomeOwner);

    return (
        <Container>
            <Header user={user} />
            <Box sx={{display: 'flex', p: '0 24px'}}>
                <Stack sx={{width: '30%', bgcolor:'primary.main', color: 'white'}} spacing={5}>
                    <Block>
                        <Avatar alt="You" src={avatar} sx={{border:'2px solid white', width: '60px', height: '60px'}}/>
                        <Box sx={{marginLeft: '20px'}}>
                            <Typography variant='body1' component="div">{lastname}{' '}{firstname}</Typography>
                            <Typography variant='subtitle1' component="div">{birthdate}</Typography>
                        </Box>
                    </Block>
                    <Block>
                        <Email color='info'/>
                        <Typography sx={{marginLeft: '10px'}}>{email}</Typography>
                    </Block>
                    <Box>
                        <MenuList>
                            <MenuItem onClick={() => {setChoosedInsuranceGroup(InsuranceGroup.HomeOwner)}}>
                                <ListItemIcon>
                                    <Home fontSize='small' color='info'/>
                                </ListItemIcon>
                                <ListItemText><Text color={'common.white'}>Home Owner</Text></ListItemText>
                                <ArrowForwardIos fontSize='small'  color='info'/>
                            </MenuItem>
                            <MenuItem onClick={() => {setChoosedInsuranceGroup(InsuranceGroup.HomeContent)}}>
                                <ListItemIcon>
                                    <BedroomParent fontSize='small' color='info'/> 
                                </ListItemIcon>
                                <ListItemText ><Text color={'common.white'}>Home Content</Text></ListItemText>
                                <ArrowForwardIos fontSize='small'  color='info'/>  
                            </MenuItem>
                            <MenuItem onClick={() => {setChoosedInsuranceGroup(InsuranceGroup.Bike)}}>
                            <ListItemIcon>
                                <PedalBike fontSize='small' color='info'/> 
                            </ListItemIcon>
                            <ListItemText ><Text color={'common.white'}>Bike</Text></ListItemText>
                            <ArrowForwardIos fontSize='small'  color='info'/>
                            </MenuItem>
                        </MenuList>
                    </Box>
                </Stack>
            </Box>
        </Container>
    )
}

export default User
