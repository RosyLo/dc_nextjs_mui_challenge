import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { NextPage, GetServerSideProps } from 'next';
import Image from 'next/image';
import { Contract } from '@prisma/client';
import Container from '@mui/material/Container';
import { getContractById } from '../../api/customer/contract/[id]';
import { getCustomer } from '../../api/customer/profile/[id]';
import Header from '../../../components/layout/header';
import {
  Box,
  Stack,
  Card,
  Typography,
  Button,
  NativeSelect,
} from '@mui/material';
import homeOwner from '../../../components/asset/home_owner@2x.png';
import Loading from '../../../components/common/loading';
import { Create, BookmarkBorder } from '@mui/icons-material';
import { Block } from '../../../components/common/block';
import PaymentPeriod from '../../../components/common/paymentPeriod';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
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
        createdAt: contract?.createdAt.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        currency: contract?.currency,
        deductible: contract?.deductible,
        details: contract?.details,
      },
    },
  };
};

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
};

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
  };
};

const Contract: NextPage<ContractProps> = ({ user, contract }) => {
  const {
    contractId,
    type,
    createdAt,
    price,
    paymentPeriod,
    currency,
    deductible,
    details,
  } = contract;
  const [editMode, setEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [contractPrice, setContractPrice] = useState(price);
  const [period, setPeriod] = useState(paymentPeriod);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      await fetch(
        `/api/customer/contracts/update?id=${contractId}&pp=${formData.paymentPeriod}`,
        {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            contractPrice,
          }),
        }
      );

      setEditMode(false);
      setPeriod(formData.paymentPeriod);
    } catch (error) {
      //todo : dialog for warning
      console.error('error', error);
    } finally {
    }
  };

  const getContractDetails = (type: string) => {
    const getDetailGroup = () => {
      const {
        floors,
        roof_type,
        square_meter,
        jewelry,
        max_value,
        brand,
        electric,
        bikeValue,
        frameSizeInInch,
      } = details;

      switch (type) {
        case 'HOME_OWNER':
          return {
            firstItemT: 'Floors',
            firstItemV: floors,
            secondItemT: 'Roof Type',
            secondItemV: roof_type,
            thirdItemT: 'Square Meter',
            thirdItemV: square_meter,
          };
        case 'HOME_CONTENT':
          return {
            firstItemT: 'Has Jewelry',
            firstItemV: jewelry ? 'true' : 'false',
            secondItemT: 'Max Value',
            secondItemV: max_value,
            thirdItemT: 'Square Meter ',
            thirdItemV: square_meter,
          };
        case 'BIKE':
          return {
            firstItemT: 'Brand',
            firstItemV: brand,
            secondItemT: 'Electric',
            secondItemV: electric,
            thirdItemT: 'BikeValue',
            thirdItemV: bikeValue,
            fourthItemT: 'Frame Size In Inch',
            fourthItemV: frameSizeInInch,
          };
        default:
          return null;
      }
    };

    let detail = getDetailGroup();

    return (
      <>
        <Box>
          <Typography variant="body1">{detail?.firstItemT}</Typography>
          <Typography variant="body2">{detail?.firstItemV}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">{detail?.secondItemT}</Typography>
          <Typography variant="body2">{detail?.secondItemV}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">{detail?.thirdItemT}</Typography>
          <Typography variant="body2">{detail?.thirdItemV}</Typography>
        </Box>
      </>
    );
  };

  return (
    <Container>
      <Header user={user} />
      <Box sx={{ p: '0 24px' }}>
        <Box sx={{ display: 'flex', m: '20px 0px' }}>
          <Box>
            <Image
              src={homeOwner}
              alt="Picture of the author"
              width="350px"
              height="300px"
            ></Image>
          </Box>
          <Box sx={{ p: '20px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card sx={{ width: '800px', marginBottom: '20px' }}>
                <Stack spacing={3} sx={{ p: '20px' }}>
                  <Typography variant="h3" color="primary.main">
                    Main Information
                  </Typography>
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
                    <Typography variant="body2">
                      {`${currency} ${contractPrice}`}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">Payment Period</Typography>
                    {editMode ? (
                      <PaymentPeriod
                        register={register}
                        period={period}
                        contractPrice={contractPrice}
                        setContractPrice={setContractPrice}
                        setPeriod={setPeriod}
                      />
                    ) : (
                      <Typography variant="body2">{period}</Typography>
                    )}
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      Insurance Information
                    </Typography>
                    <Typography variant="body2">
                      customized information
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">Deductible</Typography>
                    <Typography variant="body2">{deductible}</Typography>
                  </Box>
                </Stack>
                <Stack spacing={3} sx={{ p: '20px' }}>
                  <Typography variant="h3" color="primary.main">
                    Detail Information
                  </Typography>
                  {getContractDetails(type)}
                </Stack>
                <Block>
                  <Button
                    disabled={editMode}
                    variant="outlined"
                    endIcon={<Create />}
                    sx={{ marginRight: '10px' }}
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    disabled={!editMode}
                    variant="contained"
                    endIcon={<BookmarkBorder />}
                    type="submit"
                  >
                    Save
                  </Button>
                </Block>
              </Card>
            </form>
          </Box>
        </Box>
      </Box>
      <Loading isLoading={isLoading}></Loading>
    </Container>
  );
};

export default Contract;
