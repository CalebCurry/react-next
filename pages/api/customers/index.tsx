import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { Customer } from '../../customers/index';

type Return = {
    customers: Customer[];
};

export const getCustomers = async () => {
    const mongoClient = await clientPromise;

    const data = await mongoClient
        .db()
        .collection('customers')
        .find()
        .toArray();

    return JSON.parse(JSON.stringify(data));
};

export default async (req: NextApiRequest, res: NextApiResponse<Return>) => {
    const data = await getCustomers();
    res.status(200).json({ customers: data });
};
