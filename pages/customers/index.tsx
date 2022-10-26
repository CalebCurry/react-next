import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import axios from 'axios';
import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import { getCustomers } from '../api/customers/index';
import { useQuery } from '@tanstack/react-query';

import CustomerComponent from '../../components/Customer';

export type Customer = {
    _id?: ObjectId;
    name: string;
    industry: string;
};

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await getCustomers();

    return {
        props: {
            customers: data,
        },
        revalidate: 60,
    };
};

const Customers: NextPage = ({
    c,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { data: { data: { customers = [] } = {} } = {} } = useQuery(
        ['customers'],
        () => {
            return axios('/api/customers');
        },
        { initialData: c }
    );

    if (customers) {
        return (
            <>
                <h1>Customers</h1>
                {customers.map((customer: Customer) => {
                    return (
                        <CustomerComponent
                            key={customer._id?.toString()}
                            customer={customer}
                        />
                    );
                })}
            </>
        );
    }

    return null;
};

export default Customers;
