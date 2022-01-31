import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getContractById = (id: string) => {
  return prisma.contract.findFirst({
    where: { id: id },
  });
};

export const getAllContracts = (userId: string) => {
  return prisma.contract.findMany({
    where: { customerId: userId },
  });
};
