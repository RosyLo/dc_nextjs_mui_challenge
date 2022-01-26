// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, type Customer } from '@prisma/client';

const prisma = new PrismaClient()

export const getCustomer = () => {
    return prisma.customer.findFirst({
        where: {
            email: "jane@doe.tld"
        }
    });
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Customer | string>
) {
    getCustomer().then((customer) => {
        console.log(customer);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).send(`Customer with id ${req.query.id} not found`);
        }
    });
}
