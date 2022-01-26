import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, type Contract, PaymentPeriod } from '@prisma/client';

const prisma = new PrismaClient()

export const changePaymentPeriod = (id: string, paymentPeriod: PaymentPeriod) => {
    return prisma.contract.update({
        where: {
            id: id
        },
        data: {
            paymentPeriod: paymentPeriod
        }
    })
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Contract | string>
) {
    changePaymentPeriod(req.query.id.toString(), req.query.pp as PaymentPeriod).then(() => {
        res.status(200).send("Ok");
    });
}