import { PrismaClient, Customer, Address } from '@prisma/client';
const prisma = new PrismaClient();
export const getAddress = (addressId: string) => {
  return prisma.address.findFirst({
    where: {
      id: addressId,
    },
  });
};
