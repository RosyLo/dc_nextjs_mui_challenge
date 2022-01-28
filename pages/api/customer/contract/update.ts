import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Contract, PaymentPeriod } from '@prisma/client';

const prisma = new PrismaClient();

//todo: should be receive form change api

export const update = (
  id: string,
  paymentPeriod: PaymentPeriod,
  price: number
) => {
  return prisma.contract.update({
    where: {
      id: id,
    },
    data: {
      paymentPeriod,
      price,
    },
  });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contract | string>
) {
  const { contractPrice } = JSON.parse(req.body);
  update(req.query.id.toString(), req.query.pp as PaymentPeriod, contractPrice)
    .then(() => {
      res.status(200).send('Ok');
    })
    .catch(() => {
      res.status(404).send('Update fail');
    });
}
