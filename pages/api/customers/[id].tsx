import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { Customer } from '../../customers';

export const getCustomer = async (id: string | ObjectId): Promise<Customer> => {
    id = typeof id === 'string' ? new ObjectId(id) : id;
    const mongoClient = await clientPromise;

    const data = (await mongoClient
        .db()
        .collection('customers')
        .findOne({ _id: id })) as Customer;

    return data;
};

export default async (
    req: NextApiRequest,
    res: NextApiResponse<{ customer: Customer } | string>
) => {
    const id = req.query.id!;

    const data = await getCustomer(new ObjectId(id as string));

    if (!data) {
        res.status(404).json('Customer not found');
    }

    res.status(200).json({ customer: data });
};
