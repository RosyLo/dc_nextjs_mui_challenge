// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, type Customer } from '@prisma/client';

const prisma = new PrismaClient();

export const getCustomer = () => {
  return prisma.customer.findFirst({
    where: {
      email: 'jane@doe.tld',
    },
  });
};

export const getAddress = (addressId: string) => {
  return prisma.customer.findFirst({
    where: {
      id: addressId,
    },
  });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer | string>
) {
  getCustomer().then((customer) => {
    if (customer) {
      let address = getAddress(customer.addressId);
      let customerData = { ...customer, address };
      res.status(200).json(customerData);
    } else {
      res.status(404).send(`Customer with id ${req.query.id} not found`);
    }
  });
}
