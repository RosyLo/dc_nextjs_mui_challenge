import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Contract } from '@prisma/client';

const prisma = new PrismaClient();

export const getContractById = (id: string) => {
  return prisma.contract.findFirst({
    where: { id: id },
  });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contract | string>
) {
  getContractById(req.query.id.toString()).then((contract) => {
    if (contract) {
      res.status(200).json(contract);
    } else {
      res.status(404).send(`Contract with id ${req.query.id} not found`);
    }
  });
}
