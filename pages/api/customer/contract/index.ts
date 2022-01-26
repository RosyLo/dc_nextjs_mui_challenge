// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, type Contract } from '@prisma/client';

const prisma = new PrismaClient()

export const getAllContracts = (userId: string) => {
	console.log(userId);
	return prisma.contract.findMany({
		where: { customerId: userId }
	})
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Contract[] | string>
) {
	// filter contracts by user id
	if (!req.query.uid) {
		res.status(500).send("Please provide customer id for loading contract data");
	}

	getAllContracts(req.query.uid.toString()).then((contracts) => {
		res.status(200).json(contracts);
	});
}