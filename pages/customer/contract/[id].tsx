import { useState} from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import { Contract } from '@prisma/client';
import Container from '@mui/material/Container';
import { getContractById } from '../../api/customer/contract/[id]'
import { getCustomer } from '../../api/customer/profile/[id]';
import Header from '../../../components/layout/header';
import { Box, Stack, Card, Typography, Button, NativeSelect } from '@mui/material';
import homeOwner from '../../../components/asset/home_owner@2x.png'
import Loading from '../../../components/common/loading'
import { Create,  BookmarkBorder} from '@mui/icons-material';
import { Block } from '../../../components/common/block';
import { useForm } from 'react-hook-form'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id }  = context.query;
    const customer = await getCustomer();
    const contract = await getContractById(id);
    return {
      props: {
        user: {
          id: customer?.id,
          avatar: customer?.avatar,
        },
        contract: {
            contractId: contract?.id,
            type: contract?.type,
            paymentPeriod: contract?.paymentPeriod,
            price: contract?.price,
            createdAt: contract?.createdAt.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
            currency: contract?.currency,
            deductible: contract?.deductible,
            details: contract?.details
        }
      }
    }
}

type ContractDetail = {
    floors?: string;
    roof_type?: string;
    jewelry?: boolean;
    max_value?: string;
    square_meter?: number;
    brand?: string;
    electric?: boolean;
    bikeValue?: number;
    frameSizeInInch?: string;
}

type ContractProps = {
    user?: any;
    contract: {
        contractId: string;
        type: string;
        createdAt: string;
        price: number;
        paymentPeriod: string;
        currency: string;
        deductible: number;
        details: ContractDetail;
    }
}

const Contract: NextPage<ContractProps> = ({ user, contract }) => {
    const {contractId, type, createdAt, price, paymentPeriod, currency, deductible, details } = contract;
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [contractPrice, setContractPrice] = useState(price);
    const [period, setPeriod] = useState(paymentPeriod);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Container>
            <Header user={user} />
            <Box sx={{p: '0 24px'}}>
                <Box sx={{display: 'flex', m: '20px 0px'}}>
                <Box>
                    <Image  
                        src={homeOwner}
                        alt="Picture of the author"
                        width="350px"
                        height="300px">
                    </Image>
                </Box>
                    <Box sx={{p: '20px'}}>
                        <form onSubmit={handleSubmit()}>
                        <Card sx={{width: '800px', marginBottom: '20px'}}>
                            <Stack spacing={3} sx={{ p: '20px'}}>
                                <Typography variant="h3" color="primary.main">Main  Information</Typography>
                                <Box>
                                    <Typography variant="body1">Insurance Type</Typography>
                                    <Typography variant="body2">{type}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1">Create Date</Typography>
                                    <Typography variant="body2">{createdAt}</Typography>
                                    </Box>
                                <Box>
                                    <Typography variant="body1">Insurance Premium</Typography>{' '}
                                    <Typography variant="body2">{`${currency} ${contractPrice}`}
                                        
                                    </Typography> 
                                    </Box>
                                <Box>
                                    <Typography variant="body1">Payment Period</Typography>
                                    <Typography variant="body2">{editMode ? (
                                        <NativeSelect>
                                            <option value={'MONTH'}>Month</option>
                                            <option value={'YEAR'}>Year</option>
                                        </NativeSelect>) : (<Typography variant="body2">{period}</Typography>)}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1">Insurance Information</Typography>
                                    <Typography variant="body2">customized information</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1">Deductible</Typography>
                                    <Typography variant="body2">{deductible}</Typography>
                                </Box>
                            </Stack>
                            <Stack spacing={3} sx={{ p: '20px'}}>
                                <Typography variant="h3" color="primary.main">Detail Information</Typography>
                            </Stack>
                            <Block>
                            <Button disabled={editMode} variant='outlined' endIcon={<Create />} sx={{marginRight:'10px'}} onClick={() => {
                                setEditMode(true)
                            }}>Edit</Button>
                            <Button disabled={!editMode} variant='contained' endIcon={<BookmarkBorder />} type='submit'>Save</Button>
                            </Block>
                        </Card>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Loading isLoading={isLoading}></Loading>
        </Container>
    )
}

export default Contract

