import type { NextApiRequest, NextApiResponse } from 'next'

export const calcPrice = (
    paymentPeriod: string,
    price: number,
    updatedPaymentPeriod: string
  ) => {
    const getPrice = (
      paymentPeriod: string,
      price: number,
      updatedPaymentPeriod: string
    ) => {
      let updatedPrice = null;
      switch (true) {
        case paymentPeriod === 'YEAR' && updatedPaymentPeriod === 'MONTH':
          updatedPrice = (price / 12) * 1.05;
          break;
        case paymentPeriod === 'MONTH' && updatedPaymentPeriod === 'YEAR':
          updatedPrice = (price * 12) / 1.05;
          break;
        default:
          updatedPrice = price;
          break;
      }
      return updatedPrice;
    };
    let result = getPrice(paymentPeriod, price, updatedPaymentPeriod);
    return result
};
  
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{price: number}>
    ) {
        const { paymentPeriod, price, updatePaymentPeriod } = JSON.parse(req.body);
        const result = calcPrice(paymentPeriod,  price, updatePaymentPeriod)
        res.status(200).json({price: result});
}


