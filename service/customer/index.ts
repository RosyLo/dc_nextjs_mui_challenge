import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCustomer = () => {
  return prisma.customer.findFirst({
    where: {
      email: 'jane@doe.tld',
    },
  });
};

export const getAddress = (addressId: string) => {
  return prisma.address.findFirst({
    where: {
      id: addressId,
    },
  });
};
