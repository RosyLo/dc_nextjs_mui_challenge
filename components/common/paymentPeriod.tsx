import { FC } from 'react';
import NativeSelect from '@mui/material/NativeSelect';

const handlePeriodChange = async (
  paymentPeriod: string,
  price: number,
  updatePaymentPeriod: string,
  setContractPrice: (price: number) => void,
  setPeriod: (updatePaymentPeriod: string) => void
) => {
  try {
    const result = await fetch('/api/customer/contract/calc_price', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        paymentPeriod,
        price,
        updatePaymentPeriod,
      }),
    }).then((res) => res.json());

    setContractPrice(result.price);
    setPeriod(updatePaymentPeriod);
  } catch (error) {
    //todo: dialog warns
    console.error('error', error);
  } finally {
  }
};

interface PaymentPeriodProps {
  register: any;
  period: string;
  contractPrice: number;
  setContractPrice: (price: number) => void;
  setPeriod: (updatePaymentPeriod: string) => void;
}

const PaymentPeriod: FC<PaymentPeriodProps> = ({
  register,
  period,
  contractPrice,
  setContractPrice,
  setPeriod,
}) => {
  return (
    <NativeSelect
      inputProps={register('paymentPeriod')}
      defaultValue={period}
      onChange={(e) => {
        handlePeriodChange(
          period,
          contractPrice,
          e.target.value,
          setContractPrice,
          setPeriod
        );
      }}
    >
      <option value={'MONTH'}>Month</option>
      <option value={'YEAR'}>Year</option>
    </NativeSelect>
  );
};

export default PaymentPeriod;
